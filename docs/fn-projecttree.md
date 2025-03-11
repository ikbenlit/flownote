FlowNote/
├── frontend-web/            # Next.js 14 full-stack applicatie
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/        # Authenticatie routes (niet in URL)
│   │   │   ├── login/     # Login pagina
│   │   │   └── register/  # Registratie pagina
│   │   ├── (public)/      # Publieke routes (niet in URL)
│   │   │   ├── page.tsx   # Landing page
│   │   │   └── features/  # Features overzicht
│   │   ├── api/          # API endpoints
│   │   │   ├── auth/     # Authenticatie endpoints
│   │   │   │   ├── session/ # Sessie management
│   │   │   │   └── verify/ # Sessie verificatie
│   │   │   ├── deepgram/ # Deepgram API integratie
│   │   │   │   ├── test/ # Test endpoints voor Deepgram
│   │   │   │   └── token/ # Token generatie voor Deepgram
│   │   │   └── openai/   # OpenAI API integratie
│   │   │       ├── route.ts # Basis OpenAI integratie
│   │   │       └── generate/ # Specifieke tekstgeneratie functionaliteit
│   │   ├── (app)/        # Applicatie routes (na inloggen)
│   │   ├── notes/        # Notities feature
│   │   │   ├── page.tsx   # Notities overzicht
│   │   │   └── [id]/     # Individuele notitie
│   │   ├── transcribe/   # Transcriptie feature
│   │   │   └── page.tsx  # Transcriptie pagina
│   │   ├── ai-generator/ # AI generatie feature
│   │   │   └── page.tsx  # AI generator pagina
│   │   ├── tasks/       # Taken feature
│   │   │   └── page.tsx  # Taken overzicht
│   │   ├── layout.tsx    # Root layout met providers
│   │   ├── not-found.tsx # 404 pagina
│   │   ├── not-found.css # Styling voor 404 pagina
│   │   └── page.tsx     # Dashboard (na login)
│   ├── components/     # React componenten
│   │   ├── ui/         # Atomic/UI componenten
│   │   │   ├── Button.tsx # Herbruikbare button component
│   │   │   └── Input.tsx # Herbruikbare input component
│   │   ├── layout/     # Layout componenten
│   │   │   ├── Header.tsx # Header component
│   │   │   └── Sidebar.tsx # Sidebar component
│   │   └── features/   # Feature-specifieke componenten
│   │       ├── notes/  # Notitie-gerelateerde componenten
│   │       │   ├── NoteEditor.tsx # TipTap editor component
│   │       │   └── NotesList.tsx # Notities overzicht component
│   │       ├── tasks/  # Taak-gerelateerde componenten
│   │       │   └── TaskList.tsx # Taken overzicht component
│   │       └── transcribe/ # Transcriptie-gerelateerde componenten
│   │           └── AudioRecorder.tsx # Audio opname component
│   ├── services/       # Service integraties
│   │   ├── audio-service.ts # Audio opname service
│   │   └── deepgram-service.ts # Deepgram integratie service
│   ├── context/        # React Context providers
│   │   ├── AuthContext.tsx # Authenticatie context
│   │   ├── NoteContext.tsx # Notities context
│   │   ├── TaskContext.tsx # Taken context
│   │   └── I18nContext.tsx # Vertalingen context
│   ├── lib/            # Gedeelde logica en utilities
│   │   ├── firebase.ts # Firebase configuratie
│   │   ├── firebase-admin.ts # Firebase Admin SDK configuratie
│   │   └── utils/      # Helper functies
│   ├── locales/        # Vertalingen
│   │   └── nl/         # Nederlandse vertalingen
│   ├── styles/         # Styling
│   │   └── globals.css # Globale CSS met Tailwind
│   ├── types/          # TypeScript types
│   │   ├── note.ts    # Notitie types
│   │   └── task.ts    # Taak types
│   ├── public/         # Statische bestanden
│   │   └── fonts/      # Custom fonts
│   ├── middleware.ts   # Next.js middleware voor route bescherming
│   ├── next.config.js  # Next.js configuratie
│   ├── .env            # Lokale environment variabelen
│   ├── .env.local      # Environment variabelen voor productie (niet in VCS)
│   ├── package.json    # Dependencies & scripts
│   └── tailwind.config.js # Tailwind configuratie
├── backup/             # Backup van oude code
│   └── backend/        # Backup van de verwijderde backend
├── docs/               # Project documentatie
│   ├── migration/      # Documentatie over migratie
│   ├── fn-projecttree.md # Project structuur documentatie
│   ├── fn-techstack.md # Technology stack documentatie
│   ├── fn-description.md # Project beschrijving
│   └── fn-designsystem.md # Design system documentatie
├── .cursor/            # Cursor IDE configuratie
│   └── rules/          # Cursor regels
├── .firebaserc         # Firebase project configuratie
├── firebase.json       # Firebase configuratie
├── firestore.rules     # Firestore beveiligingsregels
├── firestore.indexes.json # Firestore indexen configuratie
├── vercel.json         # Vercel deployment configuratie
├── .gitignore          # Files to be ignored by Git
└── package.json        # Root package.json met scripts
