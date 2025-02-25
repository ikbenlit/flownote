import { useState } from 'react';
import { 
  generateText, 
  GenerateTextParams, 
  TextType, 
  getValidTextTypes, 
  getTextTypeDisplayName, 
  getTextTypeDescription 
} from '../services/openai-service';

/**
 * Hook for using OpenAI text generation in components
 */
export const useOpenAI = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string>('');

  /**
   * Generate text using OpenAI
   * @param params - The parameters for text generation
   * @returns Promise with the generated text
   */
  const generateTextWithOpenAI = async (params: GenerateTextParams): Promise<string> => {
    setLoading(true);
    setError(null);
    
    try {
      const text = await generateText(params);
      setGeneratedText(text);
      setLoading(false);
      return text;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate text';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  /**
   * Clear the generated text and error state
   */
  const clearGeneratedText = () => {
    setGeneratedText('');
    setError(null);
  };

  /**
   * Get a list of valid text types with display names and descriptions
   * @returns Array of text type objects
   */
  const getTextTypeOptions = () => {
    return getValidTextTypes().map(type => ({
      value: type,
      label: getTextTypeDisplayName(type),
      description: getTextTypeDescription(type)
    }));
  };

  return {
    loading,
    error,
    generatedText,
    generateText: generateTextWithOpenAI,
    clearGeneratedText,
    getTextTypeOptions,
    getValidTextTypes,
    getTextTypeDisplayName,
    getTextTypeDescription
  };
}; 