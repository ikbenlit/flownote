import React, { useState } from 'react';
import { useOpenAI } from '../hooks/useOpenAI';
import { TextType } from '../services/openai-service';

interface OpenAIGeneratorProps {
  onTextGenerated?: (text: string) => void;
  initialPrompt?: string;
  initialTextType?: TextType;
  initialExistingText?: string;
}

const OpenAIGenerator: React.FC<OpenAIGeneratorProps> = ({
  onTextGenerated,
  initialPrompt = '',
  initialTextType = 'blog',
  initialExistingText = '',
}) => {
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [textType, setTextType] = useState<TextType>(initialTextType);
  const [existingText, setExistingText] = useState<string>(initialExistingText);
  const [showExistingText, setShowExistingText] = useState<boolean>(!!initialExistingText);
  
  const { 
    loading, 
    error, 
    generatedText, 
    generateText, 
    clearGeneratedText,
    getTextTypeOptions 
  } = useOpenAI();

  const textTypeOptions = getTextTypeOptions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      return;
    }
    
    try {
      const text = await generateText({
        prompt,
        textType,
        existingText: showExistingText ? existingText : undefined,
      });
      
      if (onTextGenerated) {
        onTextGenerated(text);
      }
    } catch (error) {
      // Error is already handled by the hook
    }
  };

  const handleReset = () => {
    setPrompt('');
    setTextType('blog');
    setExistingText('');
    setShowExistingText(false);
    clearGeneratedText();
  };

  const handleUseGenerated = () => {
    if (onTextGenerated && generatedText) {
      onTextGenerated(generatedText);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">AI Tekstgenerator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="textType" className="block text-sm font-medium text-gray-700 mb-1">
            Type tekst
          </label>
          <select
            id="textType"
            value={textType}
            onChange={(e) => setTextType(e.target.value as TextType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {textTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {textType && (
            <p className="mt-1 text-sm text-gray-500">
              {textTypeOptions.find(o => o.value === textType)?.description}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Beschrijf waar je tekst over moet gaan..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useExistingText"
            checked={showExistingText}
            onChange={() => setShowExistingText(!showExistingText)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="useExistingText" className="ml-2 block text-sm text-gray-700">
            Bestaande tekst gebruiken als context
          </label>
        </div>
        
        {showExistingText && (
          <div>
            <label htmlFor="existingText" className="block text-sm font-medium text-gray-700 mb-1">
              Bestaande tekst
            </label>
            <textarea
              id="existingText"
              value={existingText}
              onChange={(e) => setExistingText(e.target.value)}
              placeholder="Plak hier je bestaande tekst..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        )}
        
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Genereren...' : 'Genereer tekst'}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">Fout:</p>
          <p>{error}</p>
        </div>
      )}
      
      {generatedText && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Gegenereerde tekst</h3>
            {onTextGenerated && (
              <button
                type="button"
                onClick={handleUseGenerated}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Gebruik deze tekst
              </button>
            )}
          </div>
          <div className="p-4 bg-gray-50 rounded-md border border-gray-200 whitespace-pre-wrap">
            {generatedText}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenAIGenerator; 