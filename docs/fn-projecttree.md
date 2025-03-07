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
│   │   └── tsconfig.json      # TypeScript configuration
│   ├── frontend-web/            # Next.js 14 full-stack applicatie
│   │   ├── app/                # Next.js App Router
│   │   │   ├── (auth)/        # Authenticatie routes (niet in URL)
│   │   │   │   ├── login/     # Login pagina
│   │   │   │   └── register/  # Registratie pagina
│   │   │   ├── (public)/      # Publieke routes (niet in URL)
│   │   │   │   ├── page.tsx   # Landing page
│   │   │   │   └── features/  # Features overzicht
│   │   │   ├── api/          # API endpoints
│   │   │   │   ├── auth/     # Authenticatie endpoints
│   │   │   │   │   ├── session/ # Sessie management
│   │   │   │   │   └── verify/ # Sessie verificatie
│   │   │   │   ├── deepgram/ # Deepgram API integratie
│   │   │   │   └── openai/   # OpenAI API integratie
│   │   │   ├── notes/        # Notities feature
│   │   │   │   ├── page.tsx   # Notities overzicht
│   │   │   │   └── [id]/     # Individuele notitie
│   │   │   ├── transcribe/   # Transcriptie feature
│   │   │   │   └── page.tsx  # Transcriptie pagina
│   │   │   ├── ai-generator/ # AI generatie feature
│   │   │   │   └── page.tsx  # AI generator pagina
│   │   │   ├── tasks/       # Taken feature
│   │   │   │   └── page.tsx  # Taken overzicht
│   │   │   ├── layout.tsx    # Root layout met providers
│   │   │   └── page.tsx     # Dashboard (na login)
│   │   ├── components/     # React componenten
│   │   │   ├── ui/         # Atomic/UI componenten
│   │   │   │   ├── Button.tsx # Herbruikbare button component
│   │   │   │   └── Input.tsx # Herbruikbare input component
│   │   │   ├── layout/     # Layout componenten
│   │   │   │   ├── Header.tsx # Header component
│   │   │   │   └── Sidebar.tsx # Sidebar component
│   │   │   └── features/   # Feature-specifieke componenten
│   │   │       ├── notes/  # Notitie-gerelateerde componenten
│   │   │       │   ├── NoteEditor.tsx # TipTap editor component
│   │   │       │   └── NotesList.tsx # Notities overzicht component
│   │   │       ├── tasks/  # Taak-gerelateerde componenten
│   │   │       │   └── TaskList.tsx # Taken overzicht component
│   │   │       └── transcribe/ # Transcriptie-gerelateerde componenten
│   │   │           └── AudioRecorder.tsx # Audio opname component
│   │   ├── context/        # React Context providers
│   │   │   ├── AuthContext.tsx # Authenticatie context
│   │   │   ├── NoteContext.tsx # Notities context
│   │   │   ├── TaskContext.tsx # Taken context
│   │   │   └── I18nContext.tsx # Vertalingen context
│   │   ├── lib/            # Gedeelde logica en utilities
│   │   │   ├── firebase.ts # Firebase configuratie
│   │   │   ├── firebase-admin.ts # Firebase Admin SDK configuratie
│   │   │   └── utils/      # Helper functies
│   │   ├── locales/        # Vertalingen
│   │   │   └── nl/         # Nederlandse vertalingen
│   │   ├── styles/         # Styling
│   │   │   └── globals.css # Globale CSS met Tailwind
│   │   ├── types/          # TypeScript types
│   │   │   ├── note.ts    # Notitie types
│   │   │   └── task.ts    # Taak types
│   │   ├── public/         # Statische bestanden
│   │   │   └── fonts/      # Custom fonts
│   │   ├── middleware.ts   # Next.js middleware voor route bescherming
│   │   ├── next.config.js  # Next.js configuratie
│   │   ├── package.json    # Dependencies & scripts
│   │   └── tailwind.config.js # Tailwind configuratie
│   ├── docs/                 # Project documentatie
│   │   ├── API_endpoints.md # API routes documentatie
│   │   ├── Architecture.md # Architectuur overzicht
│   │   ├── UserFlow.md     # User flow en UX design
│   │   ├── fn-projecttree.md # Project structuur documentatie
│   │   ├── fn-techstack.md # Technology stack documentatie
│   │   ├── fn-description.md # Project beschrijving
│   │   └── fn-designsystem.md # Design system documentatie
│   └── README.md             # Hoofdproject documentatie
├── database/                     # SQL scripts and migrations
│   ├── schema.sql               # Database structure (PostgreSQL)
│   ├── migrations/              # Database migrations
│   ├── seed.sql                 # Dummy data for development
├── .gitignore                    # Files to be ignored by Git
├── docker-compose.yml            # Docker configuration for development setup
└── README.md                     # Main project documentation
