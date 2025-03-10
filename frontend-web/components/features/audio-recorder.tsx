'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { FaMicrophone, FaStop } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'
import { AudioService } from '@/services/audio-service'
import { DeepgramService } from '@/services/deepgram-service'

type AudioRecorderProps = {
  onTranscriptionComplete: (transcription: string) => void
  onTranscriptionUpdate?: (text: string) => void
  onRecordingStateChange?: (isRecording: boolean) => void
}

export function AudioRecorder({ 
  onTranscriptionComplete, 
  onTranscriptionUpdate,
  onRecordingStateChange 
}: AudioRecorderProps) {
  const { t } = useI18n()
  
  // States
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [volume, setVolume] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  // Services
  const audioServiceRef = useRef<AudioService | null>(null)
  const deepgramServiceRef = useRef<DeepgramService | null>(null)
  const isStoppingRef = useRef(false)

  const updateRecordingState = useCallback((recording: boolean) => {
    console.log('Updating recording state:', recording)
    setIsRecording(recording)
    onRecordingStateChange?.(recording)
  }, [onRecordingStateChange])

  const handleTranscript = useCallback((text: string, isFinal: boolean) => {
    if (isFinal) {
      setCurrentTranscript(prev => {
        const newTranscript = prev ? `${prev} ${text}` : text
        onTranscriptionUpdate?.(newTranscript)
        return newTranscript
      })
    } else {
      onTranscriptionUpdate?.(text)
    }
  }, [onTranscriptionUpdate])

  // Cleanup alle services
  const cleanupServices = useCallback(async () => {
    console.log('Cleaning up services')
    
    try {
      // Eerst audio service stoppen
      if (audioServiceRef.current) {
        console.log('Stopping audio service')
        await audioServiceRef.current.stop()
        audioServiceRef.current = null
      }
      
      // Dan Deepgram disconnecten
      if (deepgramServiceRef.current) {
        console.log('Disconnecting Deepgram')
        await deepgramServiceRef.current.disconnect()
        deepgramServiceRef.current = null
      }
    } catch (err) {
      console.error('Error during cleanup:', err)
    }
  }, [])
  
  // Start recording functie zonder afhankelijkheid van stop
  const startRecording = useCallback(async () => {
    console.log('Start recording functie aangeroepen')
    if (isRecording || isProcessing) {
      console.log('Already recording or processing, ignoring start request')
      return
    }

    try {
      setIsProcessing(true)
      setError(null)
      setCurrentTranscript('')
      setVolume(0)
      isStoppingRef.current = false

      console.log('Initializing services')
      audioServiceRef.current = new AudioService(setVolume)
      deepgramServiceRef.current = new DeepgramService(
        process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '',
        {
          onTranscript: handleTranscript,
          onError: (error) => {
            console.error('Deepgram error:', error)
            setError(error.message)
            
            // Hier gebruiken we cleanupServices om circular dependency te voorkomen
            setIsProcessing(true)
            isStoppingRef.current = true
            cleanupServices().then(() => {
              updateRecordingState(false)
              setIsProcessing(false)
              isStoppingRef.current = false
            })
          }
        }
      )

      console.log('Starting audio')
      await audioServiceRef.current.start()
      
      console.log('Connecting to Deepgram')
      await deepgramServiceRef.current.connect()

      console.log('Setting up audio processing')
      audioServiceRef.current.onAudioProcess((audioData) => {
        if (!isStoppingRef.current && deepgramServiceRef.current) {
          try {
            deepgramServiceRef.current.sendAudio(audioData)
          } catch (err) {
            console.error('Error sending audio:', err)
          }
        }
      })

      console.log('Updating recording state to true')
      updateRecordingState(true)
    } catch (err) {
      console.error('Error starting recording:', err)
      setError(err instanceof Error ? err.message : 'Opname starten mislukt')
      await cleanupServices()
    } finally {
      setIsProcessing(false)
    }
  }, [isRecording, isProcessing, handleTranscript, updateRecordingState, cleanupServices])
  
  // Stop recording functie zonder circular dependency
  const stopRecording = useCallback(async () => {
    console.log('Stop recording functie aangeroepen')
    
    if (!isRecording) {
      console.log('Not recording, ignoring stop request')
      return
    }
    
    if (isStoppingRef.current) {
      console.log('Already stopping, ignoring duplicate stop request')
      return
    }
    
    console.log('Setting stopping flag and processing state')
    isStoppingRef.current = true
    setIsProcessing(true)
    
    try {
      console.log('Stopping recording - calling cleanup')
      await cleanupServices()
      
      console.log('Setting recording state to false')
      updateRecordingState(false)
      
      // Verwerk laatste transcript
      if (currentTranscript.trim()) {
        console.log('Completing transcription')
        onTranscriptionComplete(currentTranscript.trim())
      }
    } catch (err) {
      console.error('Error stopping recording:', err)
      setError('Opname stoppen mislukt')
    } finally {
      console.log('Reset stopping flag and processing state')
      setIsProcessing(false)
      isStoppingRef.current = false
      setVolume(0)
    }
  }, [cleanupServices, currentTranscript, isRecording, onTranscriptionComplete, updateRecordingState])
  
  // Button click handler - expliciet debug logging
  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Button clicked, isRecording:', isRecording, 'isProcessing:', isProcessing, 'event:', e.type);
    
    if (isProcessing) {
      console.log('Processing in progress, ignoring button click');
      return;
    }
    
    if (isRecording) {
      console.log('Will stop recording');
      stopRecording();
    } else {
      console.log('Will start recording');
      startRecording();
    }
  }, [isRecording, isProcessing, startRecording, stopRecording]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      console.log('Component unmounting, cleaning up')
      cleanupServices()
    }
  }, [cleanupServices])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Opnameknop - vereenvoudigd design zonder overlays */}
      <div className="flex flex-col items-center gap-2">
        {/* Originele knop, zonder overlay elementen */}
        <button
          type="button"
          onClick={handleButtonClick}
          onMouseDown={(e) => console.log('Mouse down on button')}
          onMouseUp={(e) => console.log('Mouse up on button')}
          disabled={isProcessing}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
            isRecording
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/60 dark:text-red-400 dark:hover:bg-red-800/70 border-red-400'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/60 dark:text-blue-400 dark:hover:bg-blue-800/70 border-blue-400'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? <FaStop data-testid="stop-icon" /> : <FaMicrophone data-testid="mic-icon" />}
        </button>
        
        {/* Volume indicator los van de button - niet overlappend */}
        {isRecording && (
          <div className="text-xs text-gray-500 mt-1">
            Volume: {Math.round(volume)}%
          </div>
        )}
      </div>

      {/* Status tekst */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isProcessing ? (
          isRecording ? 'Bezig met stoppen...' : 'Bezig met starten...'
        ) : isRecording ? (
          <span>{t('transcription.recording')}</span>
        ) : (
          t('transcription.start')
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 max-w-xs text-center">
          {error}
        </div>
      )}

      {/* Live transcript */}
      {currentTranscript && (
        <div className="max-w-md text-sm text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          {currentTranscript}
        </div>
      )}
    </div>
  )
} 