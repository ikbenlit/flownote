import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { Server } from 'ws';
import { createServer } from 'http';
import WebSocket from 'ws';
import openaiRoutes from './routes/openai-routes';

const app = express();
const port = process.env.PORT || 3000;

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new Server({ server });

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS with specific origin in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://flownote-five.vercel.app']
    : 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/openai', openaiRoutes);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 