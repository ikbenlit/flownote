import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useOpenAI } from '../hooks/useOpenAI';
import { GenerateTextParams, TextType } from '../services/openai-service';

// Define the AI action types
export type AIAction = 'improve' | 'continue' | 'rewrite' | 'summarize' | 'custom';

// Define the context type
interface AIContextType {
  loading: boolean;
  error: string | null;
  generatedText: string;
  generateTextWithAI: (text: string, action: AIAction, customPrompt?: string, textType?: TextType) => Promise<string>;
  clearGeneratedText: () => void;
}

// Create the context
const AIContext = createContext<AIContextType | undefined>(undefined);

// Create the provider component
export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    loading, 
    error, 
    generatedText, 
    generateText, 
    clearGeneratedText 
  } = useOpenAI();

  // Function to generate text based on action type
  const generateTextWithAI = async (
    text: string, 
    action: AIAction, 
    customPrompt?: string,
    textType: TextType = 'blog'
  ): Promise<string> => {
    let prompt = '';
    
    // Create appropriate prompt based on action
    switch (action) {
      case 'improve':
        prompt = `Verbeter de volgende tekst. Behoud de originele betekenis, maar maak de tekst duidelijker, beter gestructureerd en professioneler: ${customPrompt || ''}`;
        break;
      case 'continue':
        prompt = `Ga verder met de volgende tekst. Behoud dezelfde stijl en toon: ${customPrompt || ''}`;
        break;
      case 'rewrite':
        prompt = `Herschrijf de volgende tekst in een andere stijl, maar behoud de kernboodschap: ${customPrompt || ''}`;
        break;
      case 'summarize':
        prompt = `Vat de volgende tekst samen tot de belangrijkste punten: ${customPrompt || ''}`;
        break;
      case 'custom':
        prompt = customPrompt || 'Verwerk de volgende tekst:';
        break;
      default:
        prompt = 'Verwerk de volgende tekst:';
    }

    // Generate text using the OpenAI service
    const params: GenerateTextParams = {
      prompt,
      textType,
      existingText: text
    };

    return await generateText(params);
  };

  // Return the context provider
  return (
    <AIContext.Provider
      value={{
        loading,
        error,
        generatedText,
        generateTextWithAI,
        clearGeneratedText
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

// Create a hook to use the AI context
export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}; 