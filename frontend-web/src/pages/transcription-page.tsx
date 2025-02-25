import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AudioRecorder } from '../components/audio-recorder';
import { FaSave, FaEdit } from 'react-icons/fa';

/**
 * Page component for audio transcription
 */
export const TranscriptionPage: React.FC = () => {
  const [transcription, setTranscription] = useState<string>('');
  const navigate = useNavigate();

  const handleSaveAsNote = () => {
    navigate('/notes/new-from-transcription', { state: { transcription } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Audio Transcription</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <AudioRecorder onTranscriptionComplete={setTranscription} />
        
        {transcription && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Transcription:</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveAsNote}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={!transcription}
                >
                  <FaSave className="mr-1.5" />
                  Save as Note
                </button>
                <button
                  onClick={handleSaveAsNote}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={!transcription}
                >
                  <FaEdit className="mr-1.5" />
                  Edit & Save
                </button>
              </div>
            </div>
            <p className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 