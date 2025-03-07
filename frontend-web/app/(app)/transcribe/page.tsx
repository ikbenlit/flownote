'use client';

import { useState } from 'react';

export default function TranscribePage() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transcriptie</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2`}
          >
            <span className={`w-3 h-3 rounded-full ${isRecording ? 'animate-pulse bg-white' : 'bg-red-500'}`} />
            <span>{isRecording ? 'Stop Opname' : 'Start Opname'}</span>
          </button>

          <div className="p-4 border rounded-lg dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300">
              Transcriptie zal hier verschijnen...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 