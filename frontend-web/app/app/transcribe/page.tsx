'use client';

import React from 'react';
import type { FC } from 'react';
import { useState } from 'react';
import { AudioRecorder } from '@/components/features/audio-recorder';
import { I18nProvider, useI18n } from '@/context/I18nContext'; // Import useI18n explicitly
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const TranscribePage: FC = () => {
  const { t } = useI18n();
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');

  const handleTranscriptionComplete = (text: string) => {
    setTranscription(text);
  };

  const handleTranscriptionUpdate = (text: string) => {
    setLiveTranscript(text);
  };

  const handleRecordingStateChange = (recording: boolean) => {
    console.log('Recording state changed:', recording);
    setIsRecording(recording);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {t('transcription.title')}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center space-y-8">
          <AudioRecorder 
            onTranscriptionComplete={handleTranscriptionComplete}
            onTranscriptionUpdate={handleTranscriptionUpdate}
            onRecordingStateChange={handleRecordingStateChange}
          />
          
          {liveTranscript && isRecording && (
            <div className="w-full mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {t('transcription.live_preview')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-patrick-hand">
                {liveTranscript}
              </p>
            </div>
          )}
        </div>
      </div>

      {transcription && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {t('transcription.result')}
          </h2>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-patrick-hand">
              {transcription}
            </p>
          </div>
          
          <div className="flex justify-end">
            <Link
              href={`/notes/new-from-transcription?text=${encodeURIComponent(transcription)}`}
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
}

export default TranscribePage; 