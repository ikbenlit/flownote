'use client'

import { useState, useRef, useEffect } from 'react'
import { FaMicrophone, FaStop, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'

type AudioRecorderProps = {
  onTranscriptionComplete: (transcription: string) => void
  onTranscriptionUpdate?: (text: string) => void
}

export function AudioRecorder({ onTranscriptionComplete, onTranscriptionUpdate }: AudioRecorderProps) {
  const { t } = useI18n()
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [volume, setVolume] = useState(0)
  const [timeSinceLastSpeech, setTimeSinceLastSpeech] = useState(0)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const [waveformData, setWaveformData] = useState<number[]>(Array(40).fill(0))

  // Refs voor audio processing
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const processorNodeRef = useRef<ScriptProcessorNode | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const isRecordingRef = useRef(false)
  
  // Refs voor transcriptie
  const lastSpeechTimeRef = useRef<number>(Date.now())
  const silenceCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const transcriptPartsRef = useRef<string[]>([])
  const reconnectAttemptsRef = useRef<number>(0)
  const maxReconnectAttempts = 3
  const waveformAnimationRef = useRef<number | null>(null)

  // Constants
  const noSpeechTimeout = 15000 // 15 seconden stilte
  const sampleRate = 48000

  const updateVolumeMeter = () => {
    if (!analyserRef.current || !isRecordingRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length
    const normalizedVolume = Math.max(0, Math.min(100, (average / 128) * 100))
    setVolume(normalizedVolume)

    // Update waveform data
    const newWaveformData = [...waveformData]
    newWaveformData.shift() // Remove first element
    
    // Add a new value with some randomization for a more natural look
    const baseHeight = normalizedVolume / 100
    const randomFactor = 0.2 // 20% randomization
    const randomizedHeight = baseHeight * (1 - randomFactor + Math.random() * randomFactor * 2)
    newWaveformData.push(randomizedHeight)
    
    setWaveformData(newWaveformData)

    if (isRecordingRef.current) {
      waveformAnimationRef.current = requestAnimationFrame(updateVolumeMeter)
    }
  }

  const startRecording = async () => {
    try {
      setError(null)
      reconnectAttemptsRef.current = 0
      setConnectionStatus('connecting')
      
      // Haal Deepgram token op
      const tokenResponse = await fetch('/api/deepgram-token')
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json().catch(() => ({}))
        console.error('Token ophalen mislukt:', tokenResponse.status, errorData)
        throw new Error(t('transcription.error.token_failed'))
      }
      
      const data = await tokenResponse.json()
      if (!data.token) {
        console.error('Ongeldig token formaat:', data)
        throw new Error(t('transcription.error.token_failed'))
      }
      
      // Initialiseer WebSocket verbinding
      setupWebSocket(data.token)

      // Setup audio context en nodes
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate,
            channelCount: 1
          }
        })

        audioContextRef.current = new AudioContext({ sampleRate })
        const source = audioContextRef.current.createMediaStreamSource(stream)
        gainNodeRef.current = audioContextRef.current.createGain()
        analyserRef.current = audioContextRef.current.createAnalyser()
        processorNodeRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1)

        analyserRef.current.fftSize = 1024
        analyserRef.current.smoothingTimeConstant = 0.1

        // Reset state
        transcriptPartsRef.current = []
        isRecordingRef.current = true
        setIsRecording(true)
        lastSpeechTimeRef.current = Date.now()
        setTimeSinceLastSpeech(0)
        setWaveformData(Array(40).fill(0))

        // Start silence detection
        silenceCheckIntervalRef.current = setInterval(() => {
          const noSpeechDuration = Date.now() - lastSpeechTimeRef.current
          setTimeSinceLastSpeech(Math.floor(noSpeechDuration / 1000))

          if (noSpeechDuration >= noSpeechTimeout) {
            console.log(`Stoppen na ${noSpeechTimeout/1000}s zonder spraak`)
            stopRecording()
          }
        }, 1000)

        // Connect nodes
        source.connect(gainNodeRef.current)
        gainNodeRef.current.connect(analyserRef.current)
        gainNodeRef.current.connect(processorNodeRef.current)
        processorNodeRef.current.connect(audioContextRef.current.destination)
        gainNodeRef.current.gain.value = 1.0

        // Handle audio processing
        processorNodeRef.current.onaudioprocess = (e) => {
          if (!isRecordingRef.current || !socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
            return
          }

          const inputData = e.inputBuffer.getChannelData(0)
          const samples = new Int16Array(inputData.length)
          
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]))
            samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
          }

          try {
            socketRef.current.send(samples.buffer)
          } catch (err) {
            console.error('Fout bij verzenden audio data:', err)
            // Probeer opnieuw te verbinden als de verbinding verbroken is
            if (socketRef.current?.readyState !== WebSocket.OPEN && reconnectAttemptsRef.current < maxReconnectAttempts) {
              reconnectWebSocket()
            }
          }
        }

        // Start volume meter
        waveformAnimationRef.current = requestAnimationFrame(updateVolumeMeter)

      } catch (err) {
        if (err instanceof DOMException && err.name === 'NotAllowedError') {
          throw new Error(t('transcription.error.permission_denied'))
        } else if (err instanceof DOMException && err.name === 'NotFoundError') {
          throw new Error(t('transcription.error.microphone'))
        } else {
          console.error('Microfoon toegang fout:', err)
          throw new Error(t('transcription.error.recording_failed'))
        }
      }
    } catch (error) {
      console.error('Fout bij starten opname:', error)
      setError(error instanceof Error ? error.message : t('transcription.error.recording_failed'))
      setConnectionStatus('disconnected')
      stopRecording()
    }
  }

  const setupWebSocket = (token: string) => {
    // Initialiseer WebSocket verbinding
    socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?token=' + token)

    socketRef.current.onopen = () => {
      console.log('Verbonden met Deepgram')
      setConnectionStatus('connected')
      setError(null)
      socketRef.current?.send(JSON.stringify({
        type: 'Configure',
        model: 'nova-2',
        language: 'nl',
        smart_format: true,
        interim_results: true,
        endpointing: 500,
      }))
    }

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'Results') {
          const transcript = data.channel?.alternatives?.[0]?.transcript || ''
          const isFinal = !data.speech_final
          
          if (transcript.trim()) {
            lastSpeechTimeRef.current = Date.now()
            setTimeSinceLastSpeech(0)
            
            if (isFinal) {
              transcriptPartsRef.current.push(transcript)
              setCurrentTranscript(transcript)
              onTranscriptionUpdate?.(transcript)
            } else {
              setCurrentTranscript(transcript)
              onTranscriptionUpdate?.(transcript)
            }
          }
        } else if (data.type === 'Error') {
          console.error('Deepgram error:', data)
          setError(t('transcription.error.websocket'))
        }
      } catch (err) {
        console.error('Fout bij verwerken van WebSocket bericht:', err)
      }
    }

    socketRef.current.onerror = (event) => {
      console.error('WebSocket error:', event)
      setConnectionStatus('disconnected')
      setError(t('transcription.error.websocket'))
    }

    socketRef.current.onclose = (event) => {
      console.log('WebSocket gesloten:', event.code, event.reason)
      setConnectionStatus('disconnected')
      
      // Probeer opnieuw te verbinden als de verbinding onverwacht wordt gesloten
      if (isRecordingRef.current && reconnectAttemptsRef.current < maxReconnectAttempts) {
        reconnectWebSocket()
      } else if (event.code !== 1000 && event.code !== 1001) {
        // 1000 (Normal Closure) en 1001 (Going Away) zijn normale sluitingscodes
        setError(t('transcription.error.connection_failed'))
      }
    }
  }

  const reconnectWebSocket = async () => {
    reconnectAttemptsRef.current += 1
    console.log(`Poging ${reconnectAttemptsRef.current} om opnieuw te verbinden...`)
    setConnectionStatus('connecting')
    
    try {
      const tokenResponse = await fetch('/api/deepgram-token')
      if (!tokenResponse.ok) {
        throw new Error(t('transcription.error.token_failed'))
      }
      
      const { token } = await tokenResponse.json()
      setupWebSocket(token)
    } catch (err) {
      console.error('Opnieuw verbinden mislukt:', err)
      setError(t('transcription.error.connection_failed'))
      setConnectionStatus('disconnected')
      
      if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.error('Maximum aantal herverbindingspogingen bereikt')
        stopRecording()
      }
    }
  }

  const stopRecording = () => {
    if (!isRecordingRef.current && !isProcessing) return

    isRecordingRef.current = false
    setIsRecording(false)
    setIsProcessing(true)
    setConnectionStatus('disconnected')

    // Stop animation frame
    if (waveformAnimationRef.current) {
      cancelAnimationFrame(waveformAnimationRef.current)
      waveformAnimationRef.current = null
    }

    // Stop audio processing
    if (processorNodeRef.current) {
      processorNodeRef.current.disconnect()
      processorNodeRef.current = null
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect()
      analyserRef.current = null
    }

    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }

    // Stop WebSocket
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }

    // Clear intervals
    if (silenceCheckIntervalRef.current) {
      clearInterval(silenceCheckIntervalRef.current)
      silenceCheckIntervalRef.current = null
    }

    // Combineer alle transcriptie delen
    const finalTranscript = transcriptPartsRef.current.join(' ').trim()
    if (finalTranscript) {
      onTranscriptionComplete(finalTranscript)
    } else if (isRecording && !error) {
      // Alleen tonen als we daadwerkelijk aan het opnemen waren en er geen andere fout is
      setError(t('transcription.error.no_speech'))
    }

    setIsProcessing(false)
    setVolume(0)
    setCurrentTranscript('')
    setTimeSinceLastSpeech(0)
    setWaveformData(Array(40).fill(0))
  }

  // Cleanup bij unmount
  useEffect(() => {
    return () => {
      if (waveformAnimationRef.current) {
        cancelAnimationFrame(waveformAnimationRef.current)
      }
      stopRecording()
    }
  }, [])

  // Functie om de kleur van de verbindingsstatus te bepalen
  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-green-500 dark:text-green-400'
      case 'connecting':
        return 'text-yellow-500 dark:text-yellow-400'
      case 'disconnected':
        return 'text-gray-400 dark:text-gray-500'
    }
  }

  // Functie om de tekst van de verbindingsstatus te bepalen
  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return t('transcription.status.connected')
      case 'connecting':
        return t('transcription.status.connecting')
      case 'disconnected':
        return isProcessing ? t('transcription.processing') : t('transcription.status.idle')
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Verbindingsstatus indicator */}
      <div className={`text-xs ${getConnectionStatusColor()} flex items-center gap-1 transition-colors duration-300`}>
        <div className={`w-2 h-2 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500 dark:bg-green-400' : 
          connectionStatus === 'connecting' ? 'bg-yellow-500 dark:bg-yellow-400 animate-pulse' : 
          'bg-gray-400 dark:bg-gray-500'
        }`} />
        {getConnectionStatusText()}
      </div>

      {/* Opnameknop met volume indicator */}
      <div className="relative w-24 h-24">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`w-full h-full rounded-full flex items-center justify-center text-3xl transition-all duration-200 ${
            isRecording
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-800/30 animate-pulse'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-800/30'
          }`}
        >
          {isProcessing ? (
            <FaSpinner className="animate-spin" />
          ) : isRecording ? (
            <FaStop />
          ) : (
            <FaMicrophone />
          )}
        </button>
        
        {/* Verbeterde volume indicator */}
        {volume > 0 && (
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 rounded-full transition-all duration-100"
            style={{ 
              height: `${Math.min(100, volume)}%`, 
              opacity: Math.min(0.7, volume / 100 + 0.2) 
            }}
          />
        )}
        
        {/* Pulserende ring tijdens opname */}
        {isRecording && (
          <div className="absolute -inset-2 rounded-full border-2 border-red-400 dark:border-red-500 animate-ping opacity-50" />
        )}
      </div>

      {/* Status tekst */}
      <div className="text-sm text-gray-600 dark:text-dark-text-secondary font-patrick-hand">
        {isProcessing
          ? t('transcription.processing')
          : isRecording
          ? `${t('transcription.recording')}${timeSinceLastSpeech > 0 ? ` (${timeSinceLastSpeech}s stil)` : ''}`
          : t('transcription.start')}
      </div>

      {/* Waveform visualisatie */}
      {isRecording && (
        <div className="w-full max-w-xs h-12 flex items-center justify-center gap-[2px] px-2 mt-2">
          {waveformData.map((height, index) => (
            <div
              key={index}
              className="w-1 bg-blue-400 dark:bg-blue-500 rounded-full transition-all duration-75"
              style={{ 
                height: `${Math.max(4, height * 48)}px`,
                opacity: Math.max(0.3, height)
              }}
            />
          ))}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 max-w-xs text-center mt-2 flex items-center gap-2 bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
          <FaExclamationTriangle />
          <span>{error}</span>
        </div>
      )}

      {/* Live transcript */}
      {currentTranscript && (
        <div className="max-w-md text-sm text-gray-700 dark:text-dark-text-secondary italic font-patrick-hand p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          {currentTranscript}
        </div>
      )}
    </div>
  )
} 