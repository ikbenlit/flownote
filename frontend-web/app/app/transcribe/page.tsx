'use client';

import React, { useCallback, useState } from 'react';
import type { FC } from 'react';
import { AudioRecorder } from '@/components/features/audio-recorder';
import { useI18n } from '@/context/I18nContext';
import Link from 'next/link';
import { ArrowRight, Copy } from 'lucide-react'; // Gebruik lucide-react voor het copy-icoontje

const TranscribePage: FC = () => {
  const { t } = useI18n();
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [finalTranscription, setFinalTranscription] = useState('');
  const [copySuccessLive, setCopySuccessLive] = useState(false); // State voor live copy-status
  const [copySuccessFinal, setCopySuccessFinal] = useState(false); // State voor final copy-status

  const handleTranscriptionUpdate = useCallback((text: string) => {
    console.log('Live transcript update:', text);
    if (isRecording) {
      setLiveTranscript(text);
    }
  }, [isRecording]);

  const handleTranscriptionComplete = useCallback((text: string) => {
    console.log('Final transcription:', text);
    setFinalTranscription((prev) => prev ? `${prev} ${text}` : text);
  }, []);

  const handleRecordingStateChange = useCallback((recording: boolean) => {
    console.log('Recording state changed:', recording);
    setIsRecording(recording);
    if (!recording && !finalTranscription) {
      setLiveTranscript('');
    }
  }, [finalTranscription]);

  const resetTranscription = useCallback(() => {
    setLiveTranscript('');
    setFinalTranscription('');
    setCopySuccessLive(false);
    setCopySuccessFinal(false);
  }, []);

  const handleCopy = useCallback((text: string, isLive: boolean) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (isLive) {
          setCopySuccessLive(true);
          setTimeout(() => setCopySuccessLive(false), 2000); // Reset na 2 seconden
        } else {
          setCopySuccessFinal(true);
          setTimeout(() => setCopySuccessFinal(false), 2000); // Reset na 2 seconden
        }
      })
      .catch((err) => {
        console.error('Kopiëren mislukt:', err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('transcription.title')}
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center space-y-8">
          <AudioRecorder
            onTranscriptionUpdate={handleTranscriptionUpdate}
            onTranscriptionComplete={handleTranscriptionComplete}
            onRecordingStateChange={handleRecordingStateChange}
          />

          {liveTranscript && isRecording && (
            <div className="w-full mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg relative">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('transcription.live_preview')}
              </h3>
              <div className="relative">
                <p className="text-gray-700 dark:text-gray-300 font-inter whitespace-pre-wrap">
                  {liveTranscript}
                </p>
                <button
                  onClick={() => handleCopy(liveTranscript, true)}
                  className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                  aria-label="Kopieer live transcriptie"
                >
                  <Copy
                    className={`w-4 h-4 ${copySuccessLive ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {finalTranscription && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t('transcription.result')}
          </h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg relative mb-6">
            <div className="relative">
              <p className="text-gray-700 dark:text-gray-300 font-inter whitespace-pre-wrap">
                {finalTranscription}
              </p>
              <button
                onClick={() => handleCopy(finalTranscription, false)}
                className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Kopieer finale transcriptie"
              >
                <Copy
                  className={`w-4 h-4 ${copySuccessFinal ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={resetTranscription}
              className="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              {t('transcription.clear')}
            </button>
            <Link
              href={`/app/notes/new?text=${encodeURIComponent(finalTranscription)}`}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('transcription.create_note')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscribePage;