import { createClient } from '@deepgram/sdk';

/**
 * Service for handling Deepgram transcription requests
 */
class DeepgramService {
  private deepgram;

  constructor() {
    const apiKey = process.env.DEEPGRAM_API_KEY;
    if (!apiKey) {
      throw new Error('DEEPGRAM_API_KEY is not set in environment variables');
    }
    this.deepgram = createClient(apiKey);
  }

  /**
   * Transcribe audio buffer to text
   * @param audioBuffer - The audio buffer to transcribe
   * @param mimetype - The MIME type of the audio buffer
   * @returns Promise with transcription result
   */
  async transcribeAudio(audioBuffer: Buffer, mimetype: string): Promise<string> {
    try {
      const { result, error } = await this.deepgram.listen.prerecorded.transcribeFile(
        audioBuffer,
        {
          smart_format: true,
          model: 'nova-2',
          language: 'nl',
        }
      );

      if (error) {
        console.error('Deepgram transcription error:', error);
        throw new Error('Failed to transcribe audio');
      }

      return result?.results?.utterances?.[0]?.transcript || '';
    } catch (error) {
      console.error('Deepgram transcription error:', error);
      throw new Error('Failed to transcribe audio');
    }
  }
}

export default new DeepgramService(); 