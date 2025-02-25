## Frontend (Web)
- **Framework**: React + Vite + TypeScript → For a fast and modular web app.
- **UI Styling**: Tailwind CSS → For streamlined and responsive styling.
- **Routing**: React Router → For page navigation.
- **Components**: Functional React components with hooks.

📂 **Key Frontend Files:**
- `App.tsx` → Main component with routing.
- `pages/transcription-page.tsx` → Audio recording and transcription interface.
- `components/audio-recorder.tsx` → Audio recording functionality.
- `components/AuthButton.tsx` → Authentication button (in progress).

## Backend
- **Server**: Node.js + Express + TypeScript → Type-safe API server.
- **AI Integration**:
  - **Deepgram API** → For Dutch speech-to-text transcription.
- **Middleware**: 
  - CORS → For secure cross-origin requests
  - Multer → For handling audio file uploads
  - Express JSON parser → For request parsing

📂 **Key Backend Files:**
- `src/index.ts` → Main server file with Express and Deepgram setup.
- `tsconfig.json` → TypeScript configuration.
- `.env` → Environment variables (Deepgram API key).

## Development Setup
- **Package Manager**: npm
- **Development Tools**:
  - nodemon → For hot-reloading backend
  - ts-node → For TypeScript execution
  - TypeScript → For type safety

## API Endpoints
- `GET /api/health` → Health check endpoint
- `POST /api/transcribe` → Audio transcription endpoint
  - Accepts: multipart/form-data with audio file
  - Returns: JSON with transcription text

## 🌟 Current Features
✅ Real-time speech-to-text transcription via Deepgram
✅ Dutch language support for transcriptions
✅ Cross-origin support for frontend integration
✅ Type-safe backend with TypeScript
✅ Hot-reloading development setup

## 🚀 Planned Features
- [ ] Firebase authentication integration
- [ ] OpenAI integration for content generation
- [ ] PostgreSQL database setup
- [ ] User management system
- [ ] Firestore data storage
- [ ] Docker containerization
- [ ] Database migrations