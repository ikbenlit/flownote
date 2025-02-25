import { Request, Response } from 'express';
import deepgramService from '../services/deepgram-service';

/**
 * Controller for handling transcription requests
 */
export const transcribeAudio = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const transcription = await deepgramService.transcribeAudio(req.file.buffer, req.file.mimetype);
    res.json({ transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Failed to process transcription' });
  }
}; 