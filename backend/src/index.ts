import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'ws';
import { createServer } from 'http';
import WebSocket from 'ws';
import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';

// Define interfaces for type safety
interface StopMessage {
  type: 'stop';
}

const app = express();
const port = 3000;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new Server({ server });

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS
app.use(cors());
app.use(express.json());

// WebSocket connection handler
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  
  // Create Deepgram client
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '');
  
  // Create Deepgram live transcription connection
  const dgConnection = deepgram.listen.live({
    language: 'nl',
    punctuate: true,
    encoding: 'linear16',
    sample_rate: 48000,
    channels: 1,
    interim_results: true,
    endpointing: 500,
    model: 'nova-2',
    smart_format: true
  });
  
  let isDeepgramReady = false;
  const audioQueue: WebSocket.Data[] = [];

  // Function to process queued audio chunks
  const processAudioQueue = () => {
    while (audioQueue.length > 0 && isDeepgramReady) {
      const chunk = audioQueue.shift();
      if (chunk) {
        let size: number | 'unknown' = 'unknown';
        let format = 'unknown';
        
        if (chunk instanceof Buffer) {
          size = chunk.length;
          format = 'Buffer';
        } else if (chunk instanceof ArrayBuffer) {
          size = chunk.byteLength;
          format = 'ArrayBuffer';
        } else if (ArrayBuffer.isView(chunk)) {
          size = chunk.byteLength;
          format = chunk.constructor.name;
        }
        
        console.log(`Processing queued chunk - Size: ${size}, Format: ${format}`);
        
        try {
          // Ensure the chunk is in the correct format (Int16Array)
          let audioData: Int16Array;
          if (chunk instanceof Buffer) {
            audioData = new Int16Array(chunk.buffer);
          } else if (chunk instanceof ArrayBuffer) {
            audioData = new Int16Array(chunk);
          } else if (chunk instanceof Int16Array) {
            audioData = chunk;
          } else if (ArrayBuffer.isView(chunk)) {
            audioData = new Int16Array(chunk.buffer);
          } else {
            throw new Error(`Unsupported audio format: ${format}`);
          }

          // Verify audio data before sending
          const nonZeroSamples = audioData.filter(x => x !== 0).length;
          const maxValue = Math.max(...audioData.map(Math.abs));
          
          console.log(`Audio stats - Size: ${audioData.buffer.byteLength} bytes, ` +
                     `Non-zero samples: ${nonZeroSamples}, ` +
                     `Max amplitude: ${maxValue}`);
          
          if (nonZeroSamples > 0 && maxValue > 0) {
            dgConnection.send(audioData.buffer);
            console.log(`Successfully sent chunk to Deepgram - Size: ${audioData.buffer.byteLength} bytes`);
          } else {
            console.log('Skipping silent chunk');
          }
        } catch (error) {
          console.error('Error sending chunk to Deepgram:', error);
          if (error instanceof Error) {
            console.error('Error details:', error.message);
          }
        }
      }
    }
  };

  // Deepgram WebSocket handlers
  dgConnection.on(LiveTranscriptionEvents.Open, () => {
    console.log('Connected to Deepgram');
    isDeepgramReady = true;
    processAudioQueue(); // Process any queued chunks
  });

  dgConnection.on(LiveTranscriptionEvents.Transcript, (data) => {
    try {
      // Only log non-empty responses
      if (data.channel?.alternatives?.[0]?.transcript) {
        console.log('Received transcript:', data.channel.alternatives[0].transcript);
      }
      
      // Always send transcript data to client, even if empty
      // This helps the client track when speech is detected
      if (data.is_final) {
        const transcript = data.channel?.alternatives?.[0]?.transcript || '';
        console.log('Sending transcript to client:', transcript || '(empty)', 'is_final:', data.is_final);
        ws.send(JSON.stringify({ 
          transcript,
          is_final: data.is_final,
          speech_detected: !!transcript.trim() // Add flag indicating if speech was detected
        }));
      } else if (data.channel?.alternatives?.[0]?.transcript) {
        // For interim results, only send if there's actual content
        const transcript = data.channel.alternatives[0].transcript;
        console.log('Sending interim transcript to client:', transcript, 'is_final:', data.is_final);
        ws.send(JSON.stringify({ 
          transcript,
          is_final: data.is_final,
          speech_detected: true
        }));
      }
    } catch (error: unknown) {
      console.error('Error processing Deepgram message:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
      }
    }
  });

  dgConnection.on(LiveTranscriptionEvents.Error, (error) => {
    console.error('Deepgram WebSocket error:', error);
    isDeepgramReady = false;
  });

  dgConnection.on(LiveTranscriptionEvents.Close, () => {
    console.log('Deepgram connection closed');
    isDeepgramReady = false;
  });

  // Client WebSocket handlers
  ws.on('message', (message: WebSocket.Data) => {
    if (typeof message === 'string') {
      try {
        const data = JSON.parse(message) as StopMessage;
        console.log('Received message from client:', data);
        if (data.type === 'stop') {
          console.log('Received stop signal from client');
          dgConnection.finish();
        }
      } catch (error: unknown) {
        console.error('Error parsing message:', error);
      }
    } else {
      // Queue or forward audio data to Deepgram
      if (isDeepgramReady) {
        let size: number | 'unknown' = 'unknown';
        let format = 'unknown';
        
        if (message instanceof Buffer) {
          size = message.length;
          format = 'Buffer';
        } else if (message instanceof ArrayBuffer) {
          size = message.byteLength;
          format = 'ArrayBuffer';
        } else if (ArrayBuffer.isView(message)) {
          size = message.byteLength;
          format = message.constructor.name;
        }
        
        console.log(`Received audio chunk - Size: ${size}, Format: ${format}`);
        
        try {
          // Ensure the message is in the correct format (Int16Array)
          let audioData: Int16Array;
          if (message instanceof Buffer) {
            audioData = new Int16Array(message.buffer);
          } else if (message instanceof ArrayBuffer) {
            audioData = new Int16Array(message);
          } else if (message instanceof Int16Array) {
            audioData = message;
          } else if (ArrayBuffer.isView(message)) {
            audioData = new Int16Array(message.buffer);
          } else {
            throw new Error(`Unsupported audio format: ${format}`);
          }
          
          const nonZeroSamples = audioData.filter(x => x !== 0).length;
          console.log(`Processing audio chunk - Size: ${audioData.buffer.byteLength} bytes, Non-zero samples: ${nonZeroSamples}`);
          
          dgConnection.send(audioData.buffer);
          console.log(`Successfully sent chunk to Deepgram - Size: ${audioData.buffer.byteLength} bytes`);
        } catch (error) {
          console.error('Error sending chunk to Deepgram:', error);
          if (error instanceof Error) {
            console.error('Error details:', error.message);
            console.error('Message type:', message.constructor.name);
          }
          audioQueue.push(message);
        }
      } else {
        console.log('Queueing audio chunk - WebSocket not ready');
        audioQueue.push(message);
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    dgConnection.finish();
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 