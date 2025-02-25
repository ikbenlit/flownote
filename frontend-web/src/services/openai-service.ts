/**
 * Service for handling OpenAI API requests
 */

// Define the response type from the OpenAI API
export interface OpenAIResponse {
  generatedText: string;
}

// Define the text types supported by the API
export type TextType = 'blog' | 'email' | 'report' | 'social' | 'task';

// Define the request parameters
export interface GenerateTextParams {
  prompt: string;
  textType: TextType;
  existingText?: string;
}

/**
 * Generate text using OpenAI
 * @param params - The parameters for text generation
 * @returns Promise with the generated text
 */
export const generateText = async (params: GenerateTextParams): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/openai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate text');
    }

    const data: OpenAIResponse = await response.json();
    return data.generatedText;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

/**
 * Get a list of valid text types
 * @returns Array of valid text types
 */
export const getValidTextTypes = (): TextType[] => {
  return ['blog', 'email', 'report', 'social', 'task'];
};

/**
 * Get a friendly display name for a text type
 * @param textType - The text type
 * @returns Friendly display name
 */
export const getTextTypeDisplayName = (textType: TextType): string => {
  const displayNames: Record<TextType, string> = {
    blog: 'Blog Post',
    email: 'E-mail',
    report: 'Verslag',
    social: 'Social Media Post',
    task: 'Taak',
  };
  
  return displayNames[textType] || textType;
};

/**
 * Get a description for a text type
 * @param textType - The text type
 * @returns Description of the text type
 */
export const getTextTypeDescription = (textType: TextType): string => {
  const descriptions: Record<TextType, string> = {
    blog: 'Een boeiende blog post met een duidelijke structuur',
    email: 'Een professionele e-mail met een passende aanhef en afsluiting',
    report: 'Een gestructureerd verslag met een formele schrijfstijl',
    social: 'Een pakkende social media post die engagement stimuleert',
    task: 'Een duidelijke taakbeschrijving met concrete actiepunten',
  };
  
  return descriptions[textType] || '';
}; 