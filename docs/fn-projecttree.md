FlowNote/
├── backend/                      # Backend with Node.js & Express
│   ├── src/
│   │   ├── controllers/         # Logic for API routes
│   │   ├── routes/              # API routes
│   │   ├── models/              # Database models (PostgreSQL)
│   │   ├── services/            # Integration with Deepgram & OpenAI
│   │   ├── middlewares/         # Authentication & validation
│   │   ├── utils/               # Helper functions
│   │   ├── config/              # Configuration (dotenv, database connection)
│   │   ├── index.js             # Main server file
│   │   ├── db.js                # Database connection
│   ├── .env                     # API keys and environment variables
│   ├── package.json             # Dependencies & scripts
│   ├── README.md                # Backend documentation
│   ├── nodemon.json             # Hot-reloading config
├── frontend-web/                 # Web frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AuthButton.tsx   # Firebase authentication button (Login/Logout)
│   │   │   ├── audio-recorder.tsx # Audio recording and transcription component
│   │   │   ├── NotesList.tsx    # Component for displaying notes in a grid
│   │   │   ├── NoteEditor.tsx   # Component for creating and editing notes
│   │   │   ├── NoteDetail.tsx   # Component for viewing a single note
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx         # Homepage with login functionality
│   │   │   ├── transcription-page.tsx # Page for audio transcription
│   │   │   ├── NotesPage.tsx    # Page for viewing and searching notes
│   │   │   ├── NoteDetailPage.tsx # Page for viewing a single note
│   │   │   ├── NoteEditPage.tsx # Page for editing an existing note
│   │   │   ├── NewNotePage.tsx  # Page for creating a new note
│   │   │   ├── NewNoteFromTranscriptionPage.tsx # Page for creating a note from transcription
│   │   ├── hooks/               # Custom React hooks
│   │   ├── context/             # State management (React Context API)
│   │   │   ├── NoteContext.tsx  # Context provider for notes functionality
│   │   ├── services/            # API requests (axios)
│   │   │   ├── firebase.ts      # Firebase configuration file
│   │   ├── styles/              # Styling files
│   │   │   ├── globals.css      # Global CSS for Tailwind
│   │   ├── App.tsx              # Main React component with routes and providers
│   │   ├── main.tsx             # Entry file for Vite
│   ├── package.json             # Dependencies & scripts
│   ├── vite.config.js           # Vite configuration
│   ├── .env                     # Environment variables
│   ├── README.md                # Documentation
├── database/                     # SQL scripts and migrations
│   ├── schema.sql               # Database structure (PostgreSQL)
│   ├── migrations/              # Database migrations
│   ├── seed.sql                 # Dummy data for development
├── docs/                         # Project documentation
│   ├── API_endpoints.md         # API routes documentation
│   ├── Architecture.md          # Architecture overview
│   ├── UserFlow.md              # User flow and UX design
│   ├── fn-projecttree.md        # Project structure documentation
│   ├── fn-techstack.md          # Technology stack documentation
├── .gitignore                    # Files to be ignored by Git
├── docker-compose.yml            # Docker configuration for development setup
├── README.md                     # Main project documentation
