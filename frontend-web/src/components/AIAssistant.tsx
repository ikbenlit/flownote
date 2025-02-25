import React, { useState } from 'react';
import { useAI, AIAction } from '../context/AIContext';
import { FaRobot, FaSpinner, FaTimes } from 'react-icons/fa';

interface AIAssistantProps {
  content: string;
  onApplyText: (text: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ content, onApplyText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<AIAction>('improve');
  const [customPrompt, setCustomPrompt] = useState('');
  const { loading, error, generatedText, generateTextWithAI, clearGeneratedText } = useAI();

  const handleGenerate = async () => {
    try {
      const result = await generateTextWithAI(content, action, customPrompt);
      // Result is automatically stored in generatedText via the context
    } catch (error) {
      // Error is handled by the context
    }
  };

  const handleApply = () => {
    if (generatedText) {
      onApplyText(generatedText);
      clearGeneratedText();
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    clearGeneratedText();
    setIsOpen(false);
  };

  const actionOptions = [
    { value: 'improve', label: 'Verbeteren' },
    { value: 'continue', label: 'Voortzetten' },
    { value: 'rewrite', label: 'Herschrijven' },
    { value: 'summarize', label: 'Samenvatten' },
    { value: 'custom', label: 'Aangepast' }
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FaRobot className="mr-1.5" />
        AI Assistent
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-96 bg-white rounded-md shadow-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-900">AI Assistent</h3>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="ai-action" className="block text-sm font-medium text-gray-700 mb-1">
                Actie
              </label>
              <select
                id="ai-action"
                value={action}
                onChange={(e) => setAction(e.target.value as AIAction)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {actionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {action === 'custom' && (
              <div>
                <label htmlFor="custom-prompt" className="block text-sm font-medium text-gray-700 mb-1">
                  Aangepaste instructie
                </label>
                <textarea
                  id="custom-prompt"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Geef instructies voor de AI..."
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-1.5" />
                    Genereren...
                  </>
                ) : (
                  'Genereren'
                )}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {generatedText && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Gegenereerde tekst</h4>
                  <button
                    type="button"
                    onClick={handleApply}
                    className="text-xs text-indigo-600 hover:text-indigo-500"
                  >
                    Toepassen
                  </button>
                </div>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-sm max-h-60 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{generatedText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 