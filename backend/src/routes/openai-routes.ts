import express, { Request, Response } from 'express';
import openaiService from '../services/openai-service';

const router = express.Router();

/**
 * @route POST /api/openai/generate
 * @desc Generate text using OpenAI
 * @access Public
 * @body {
 *   prompt: string,
 *   textType: string,
 *   existingText?: string
 * }
 */
router.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, textType, existingText } = req.body;

    // Validate required fields
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    if (!textType) {
      res.status(400).json({ error: 'Text type is required' });
      return;
    }

    // Validate text type
    const validTextTypes = ['blog', 'email', 'report', 'social', 'task'];
    if (!validTextTypes.includes(textType.toLowerCase())) {
      res.status(400).json({ 
        error: 'Invalid text type', 
        validTypes: validTextTypes 
      });
      return;
    }

    // Generate text using OpenAI service
    const generatedText = await openaiService.generateText(prompt, textType, existingText);
    
    // Return the generated text
    res.json({ generatedText });
  } catch (error) {
    console.error('Text generation error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
});

export default router; 