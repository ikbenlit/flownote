import express, { Request, Response } from 'express';
import multer from 'multer';
import deepgramService from '../services/deepgram-service';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Handle audio transcription requests
router.post('/transcribe', upload.single('audio'), async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No audio file provided' });
      return;
    }

    const transcription = await deepgramService.transcribeAudio(req.file.buffer, req.file.mimetype);
    res.json({ transcription });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Transcription failed' });
  }
});

export default router; 