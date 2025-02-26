import React, { useState } from 'react';
import TipTapEditor from '../components/TipTapEditor';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const TestEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('<p>Test the <u>underline</u> extension here!</p>');

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          <span>Go Back</span>
        </button>
      </div>

      <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 dark:text-dark-text-primary">TipTap Editor Test</h1>
        
        <div className="mb-4">
          <p className="text-gray-700 dark:text-dark-text-secondary mb-2">
            This is a test page for the TipTap editor with the underline extension.
            Try using the underline button in the toolbar.
          </p>
        </div>

        <TipTapEditor 
          content={content} 
          onChange={setContent} 
        />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-dark-text-primary">HTML Output:</h2>
          <pre className="bg-gray-100 dark:bg-dark-bg-tertiary p-4 rounded-lg overflow-x-auto text-sm dark:text-dark-text-secondary">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
}; 