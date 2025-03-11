'use client';

import { useState } from 'react';

export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">AI Generator</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Beschrijf waar je mee geholpen wilt worden..."
            className="w-full h-32 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={!prompt.trim()}
          >
            Genereer
          </button>
        </div>

        <div className="mt-6 p-4 border rounded-lg dark:border-gray-600">
          <p className="text-gray-600 dark:text-gray-300">
            AI gegenereerde content zal hier verschijnen...
          </p>
        </div>
      </div>
    </div>
  );
} 