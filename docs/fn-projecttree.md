FlowNote/
├── backend/                      # Backend with Node.js & Express
│   ├── src/
│   │   ├── controllers/         # Logic for API routes
│   │   ├── routes/              # API routes
│   │   │   ├── openai-routes.ts # OpenAI API routes
│   │   │   ├── transcription-routes.ts # Transcription API routes
│   │   ├── models/              # Database models (PostgreSQL)
│   │   ├── services/            # Integration with external services
│   │   │   ├── openai-service.ts # OpenAI API integration
│   │   │   ├── deepgram-service.ts # Deepgram API integration
│   │   ├── middlewares/         # Authentication & validation
│   │   ├── utils/               # Helper functions
│   │   ├── config/              # Configuration (dotenv, database connection)
│   │   ├── index.ts             # Main server file
│   │   ├── db.ts                # Database connection
│   │   ├── .env                 # API keys and environment variables
│   │   ├── package.json         # Dependencies & scripts
│   │   ├── README.md            # Backend documentation
│   │   ├── nodemon.json         # Hot-reloading config
│   ├── frontend-web/            # Web frontend (React + Vite + TypeScript)
│   │   ├── src/
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── AuthButton.tsx   # Firebase authentication button (Login/Logout)
│   │   │   │   ├── PrivateRoute.tsx # Route protection for authenticated users
│   │   │   │   ├── audio-recorder.tsx # Audio recording and transcription component
│   │   │   │   ├── NotesList.tsx    # Component for displaying notes in a grid
│   │   │   │   ├── NoteEditor.tsx   # Component for creating and editing notes
│   │   │   │   ├── NoteDetail.tsx   # Component for viewing a single note
│   │   │   │   ├── AIAssistant.tsx  # AI text generation assistant component
│   │   │   │   ├── OpenAIGenerator.tsx # Standalone OpenAI text generation component
│   │   │   │   └── tiptap/          # TipTap editor extensies
│   │   │   │       └── extensions/
│   │   │   │           └── TaskMarkExtension.tsx # Aangepaste extensie voor taakmarkeringen
│   │   │   ├── pages/           # Page components
│   │   │   │   ├── Home.tsx         # Homepage with login functionality
│   │   │   │   ├── LoginPage.tsx    # Dedicated login page with Google authentication
│   │   │   │   ├── transcription-page.tsx # Page for audio transcription
│   │   │   │   ├── NotesPage.tsx    # Page for viewing and searching notes
│   │   │   │   ├── NoteDetailPage.tsx # Page for viewing a single note
│   │   │   │   ├── NoteEditPage.tsx # Page for editing an existing note
│   │   │   │   ├── NewNotePage.tsx  # Page for creating a new note
│   │   │   │   ├── NewNoteFromTranscriptionPage.tsx # Page for creating a note from transcription
│   │   │   │   └── AIGeneratorPage.tsx # Page for standalone AI text generation
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   │   ├── useOpenAI.ts     # Hook for OpenAI text generation
│   │   │   ├── context/         # State management (React Context API)
│   │   │   │   ├── AuthContext.tsx  # Context provider for authentication
│   │   │   │   ├── NoteContext.tsx  # Context provider for notes functionality
│   │   │   │   ├── AIContext.tsx    # Context provider for AI functionality
│   │   │   │   ├── TaskContext.tsx  # Context provider for tasks
│   │   │   │   └── I18nContext.tsx  # Context provider for translations
│   │   │   ├── services/        # API requests and services
│   │   │   │   ├── firebase.ts      # Firebase configuration file
│   │   │   │   └── openai-service.ts # OpenAI API service
│   │   │   ├── styles/          # Styling files
│   │   │   │   └── globals.css      # Global CSS for Tailwind
│   │   │   ├── App.tsx          # Main React component with routes and providers
│   │   │   └── main.tsx         # Entry file for Vite
│   │   ├── public/            # Static files
│   │   │   └── fonts/         # Custom fonts
│   │   ├── index.html         # HTML template
│   │   ├── package.json       # Dependencies & scripts
│   │   ├── tailwind.config.js # Tailwind configuration
│   │   └── vite.config.ts     # Vite configuration
│   │   └── tsconfig.json      # TypeScript configuration
│   ├── docs/                # Project documentation
│   │   ├── API_endpoints.md         # API routes documentation
│   │   ├── Architecture.md          # Architecture overview
│   │   ├── UserFlow.md              # User flow and UX design
│   │   ├── fn-projecttree.md        # Project structure documentation
│   │   ├── fn-techstack.md          # Technology stack documentation
│   │   ├── fn-description.md        # Project description
│   │   ├── fn-designsystem.md       # Design system documentation
│   │   ├── implementation-markering-tasks.md # Task implementation
│   │   └── note-task.md           # Note-task integration
│   └── README.md                  # Main project documentation
├── database/                     # SQL scripts and migrations
│   ├── schema.sql               # Database structure (PostgreSQL)
│   ├── migrations/              # Database migrations
│   ├── seed.sql                 # Dummy data for development
├── .gitignore                    # Files to be ignored by Git
├── docker-compose.yml            # Docker configuration for development setup
└── README.md                     # Main project documentation
