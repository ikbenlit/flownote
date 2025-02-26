import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AudioRecorder } from '../components/audio-recorder';
import { FaSave, FaEdit, FaMicrophone, FaStickyNote, FaRobot } from 'react-icons/fa';
import AuthButton from '../components/AuthButton';
import { ThemeToggle } from '../components/ThemeToggle';

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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200">
      {/* App Header */}
      <nav className="bg-white dark:bg-dark-bg-secondary shadow-sm dark:shadow-dark-bg-primary mb-8">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/app" className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary">
              FlowNote
            </Link>
            <Link to="/transcribe" className="font-patrick-hand text-blue-500 dark:text-dark-accent-blue hover:text-blue-600 dark:hover:text-dark-accent-blue-light flex items-center">
              <FaMicrophone className="mr-1.5" />
              Transcribe
            </Link>
            <Link to="/notes" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
              <FaStickyNote className="mr-1.5" />
              Notes
            </Link>
            <Link to="/ai-generator" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
              <FaRobot className="mr-1.5" />
              AI Generator
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-dark-bg-tertiary rounded-full mb-4">
            <FaMicrophone className="text-blue-600 dark:text-dark-accent-blue text-3xl" />
          </div>
          <h1 className="font-architects-daughter text-4xl text-gray-900 dark:text-dark-text-primary mb-3">
            Spraak naar Tekst
          </h1>
          <p className="font-patrick-hand text-xl text-gray-600 dark:text-dark-text-secondary">
            Spreek je gedachten uit en zie ze direct omgezet worden in tekst
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-8 border border-gray-100 dark:border-dark-border-primary">
          <AudioRecorder onTranscriptionComplete={setTranscription} />
          
          {transcription && (
            <div className="mt-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="font-caveat text-2xl text-gray-900 dark:text-dark-text-primary">Je Transcriptie:</h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSaveAsNote}
                    className="inline-flex items-center px-4 py-2 font-patrick-hand text-lg rounded-lg text-white bg-blue-500 dark:bg-dark-accent-blue hover:bg-blue-600 dark:hover:bg-dark-accent-blue-light transform hover:scale-105 transition-all duration-200 shadow-md"
                    disabled={!transcription}
                  >
                    <FaSave className="mr-2" />
                    Opslaan als Notitie
                  </button>
                  <button
                    onClick={handleSaveAsNote}
                    className="inline-flex items-center px-4 py-2 font-patrick-hand text-lg rounded-lg text-white bg-green-500 dark:bg-dark-accent-green hover:bg-green-600 dark:hover:bg-dark-accent-green-light transform hover:scale-105 transition-all duration-200 shadow-md"
                    disabled={!transcription}
                  >
                    <FaEdit className="mr-2" />
                    Bewerken & Opslaan
                  </button>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-dark-bg-tertiary dark:to-dark-border-primary opacity-50"></div>
                <div className="relative p-6 bg-white dark:bg-dark-bg-secondary bg-opacity-80 dark:bg-opacity-80 rounded-xl border border-gray-200 dark:border-dark-border-primary">
                  <p className="font-kalam text-lg text-gray-800 dark:text-dark-text-primary whitespace-pre-wrap leading-relaxed">
                    {transcription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 