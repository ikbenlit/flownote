'use client'

import { useState, useRef, useEffect } from 'react'
import { FaMicrophone, FaStop, FaSpinner } from 'react-icons/fa'
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

    if (isRecordingRef.current) {
      requestAnimationFrame(updateVolumeMeter)
    }
  }

  const startRecording = async () => {
    try {
      // Haal Deepgram token op
      const tokenResponse = await fetch('/api/deepgram-token')
      if (!tokenResponse.ok) {
        throw new Error('Kon geen token ophalen van Deepgram')
      }
      const { key } = await tokenResponse.json()

      // Initialiseer WebSocket verbinding
      socketRef.current = new WebSocket('wss://api.deepgram.com/v1/listen?token=' + key)

      socketRef.current.onopen = () => {
        console.log('Verbonden met Deepgram')
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
        }
      }

      // Setup audio context en nodes
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

        socketRef.current.send(samples.buffer)
      }

      // Start volume meter
      updateVolumeMeter()

    } catch (error) {
      console.error('Fout bij starten opname:', error)
      alert('Er is een fout opgetreden bij het starten van de opname. Controleer je microfoon instellingen.')
      stopRecording()
    }
  }

  const stopRecording = () => {
    if (!isRecordingRef.current) return

    isRecordingRef.current = false
    setIsRecording(false)
    setIsProcessing(true)

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
    }

    setIsProcessing(false)
    setVolume(0)
    setCurrentTranscript('')
    setTimeSinceLastSpeech(0)
  }

  // Cleanup bij unmount
  useEffect(() => {
    return () => {
      stopRecording()
    }
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-24 h-24">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`w-full h-full rounded-full flex items-center justify-center text-3xl transition-all duration-200 ${
            isRecording
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-800/30'
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
        {volume > 0 && (
          <div
            className="absolute bottom-0 left-0 w-full bg-blue-200 dark:bg-blue-400/20 rounded-full transition-all duration-100"
            style={{ height: `${Math.min(100, volume)}%`, opacity: 0.5 }}
          />
        )}
      </div>
      <div className="text-sm text-gray-600 dark:text-dark-text-secondary font-patrick-hand">
        {isProcessing
          ? t('transcription.processing')
          : isRecording
          ? `${t('transcription.recording')}${timeSinceLastSpeech > 0 ? ` (${timeSinceLastSpeech}s stil)` : ''}`
          : t('transcription.start')}
      </div>
      {currentTranscript && (
        <div className="max-w-md text-sm text-gray-700 dark:text-dark-text-secondary italic font-patrick-hand">
          {currentTranscript}
        </div>
      )}
    </div>
  )
} 