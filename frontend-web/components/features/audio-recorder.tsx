'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import type { MouseEvent } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';
import { useI18n } from '@/context/I18nContext';
import { AudioService } from '@/services/audio-service';
import { DeepgramService } from '@/services/deepgram-service';

type AudioRecorderProps = {
  onTranscriptionComplete: (text: string) => void;
  onTranscriptionUpdate?: (text: string) => void;
  onRecordingStateChange?: (isRecording: boolean) => void;
};

export function AudioRecorder({
  onTranscriptionComplete,
  onTranscriptionUpdate,
  onRecordingStateChange,
}: AudioRecorderProps) {
  const { t } = useI18n();

  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const audioServiceRef = useRef<AudioService | null>(null);
  const deepgramServiceRef = useRef<DeepgramService | null>(null);
  const isStoppingRef = useRef(false);

  const updateRecordingState = useCallback(
    (recording: boolean) => {
      setIsRecording(recording);
      onRecordingStateChange?.(recording);
    },
    [onRecordingStateChange]
  );

  const cleanupServices = useCallback(async () => {
    try {
      if (audioServiceRef.current) {
        await audioServiceRef.current.stop();
        audioServiceRef.current = null;
      }
      if (deepgramServiceRef.current) {
        await deepgramServiceRef.current.disconnect();
        deepgramServiceRef.current = null;
      }
    } catch (err) {
      console.error('Error during cleanup:', err);
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (isRecording || isProcessing) return;

    try {
      setIsProcessing(true);
      setError(null);
      setVolume(0);
      isStoppingRef.current = false;

      audioServiceRef.current = new AudioService(setVolume);
      deepgramServiceRef.current = new DeepgramService(
        process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || '',
        {
          onLiveTranscript: (text) => onTranscriptionUpdate?.(text),
          onFinalTranscript: (text) => onTranscriptionComplete(text),
          onError: (error) => {
            setError(error.message);
            cleanupServices().then(() => updateRecordingState(false));
          },
        }
      );

      await audioServiceRef.current.start();
      await deepgramServiceRef.current.connect();

      audioServiceRef.current.onAudioProcess((audioData) => {
        if (!isStoppingRef.current && deepgramServiceRef.current) {
          deepgramServiceRef.current.sendAudio(audioData);
        }
      });

      updateRecordingState(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opname starten mislukt');
      await cleanupServices();
    } finally {
      setIsProcessing(false);
    }
  }, [isRecording, isProcessing, onTranscriptionUpdate, onTranscriptionComplete, updateRecordingState, cleanupServices]);

  const stopRecording = useCallback(async () => {
    if (!isRecording || isStoppingRef.current) return;

    isStoppingRef.current = true;
    setIsProcessing(true);

    try {
      await cleanupServices();
      updateRecordingState(false);
    } catch (err) {
      setError('Opname stoppen mislukt');
    } finally {
      setIsProcessing(false);
      isStoppingRef.current = false;
      setVolume(0);
    }
  }, [isRecording, cleanupServices, updateRecordingState]);

  const handleButtonClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isProcessing) return;

      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    },
    [isRecording, isProcessing, startRecording, stopRecording]
  );

  useEffect(() => {
    return () => {
      cleanupServices();
    };
  }, [cleanupServices]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isProcessing}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
            isRecording
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/60 dark:text-red-400 dark:hover:bg-red-800/70 border-red-400'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/60 dark:text-blue-400 dark:hover:bg-blue-800/70 border-blue-400'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRecording ? <FaStop data-testid="stop-icon" /> : <FaMicrophone data-testid="mic-icon" />}
        </button>
        {isRecording && (
          <div className="text-xs text-gray-500 mt-1">Volume: {Math.round(volume)}%</div>
        )}
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        {isProcessing
          ? isRecording
            ? 'Bezig met stoppen...'
            : 'Bezig met starten...'
          : isRecording
          ? <span>{t('transcription.recording')}</span>
          : t('transcription.start')}
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 max-w-xs text-center">{error}</div>
      )}
    </div>
  );
}