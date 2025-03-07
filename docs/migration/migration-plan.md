# Migratieplan: Van Vite naar Next.js

## 🎯 Doel
Dit migratieplan beschrijft de stapsgewijze overgang van onze huidige Vite-gebaseerde frontend setup naar een volledig geïntegreerde Next.js applicatie. De migratie heeft als doel het verenigen van onze frontend (Vite) en API-routes (Next.js) in één coherent framework.

## Status Update (Laatst bijgewerkt: 7 maart 2024)

### Voltooide taken
- [x] Project structuur opgezet
- [x] Next.js configuratie
- [x] Dependencies geïnstalleerd
- [x] Tailwind CSS configuratie
- [x] Development tools configuratie (ESLint, PostCSS)
- [x] Authenticatie systeem geïmplementeerd
  - Firebase authenticatie geïntegreerd
  - Session cookie management opgezet
  - Login pagina gecreëerd met dark mode ondersteuning
  - Middleware voor route beveiliging toegevoegd
  - Google Authentication werkend met automatische redirect
  - Session cookie implementatie voor persistente login
  - Middleware geoptimaliseerd voor client-side gebruik
  - API route voor sessie verificatie toegevoegd
- [x] Context providers opgezet
  - AuthContext voor gebruikersbeheer
  - I18nContext voor vertalingen met parameter ondersteuning
  - TaskContext voor taakbeheer
  - NoteContext aangepast voor lokale testing zonder Firebase
- [x] Vertalingen toegevoegd
  - Nederlandse vertalingen geïmplementeerd
  - Vertalingen voor authenticatie en basis UI
  - Dynamische taal ondersteuning
- [x] Notitie editor component
  - TipTap editor geïntegreerd
  - Taakmarkeringen functionaliteit
  - Opmaak toolbar
  - Tags systeem
  - Dark mode ondersteuning
- [x] Project structuur geconsolideerd
  - Node modules structuur opgeschoond
  - Package.json geconsolideerd
  - Configuratiebestanden samengevoegd
  - Overbodige Vite bestanden verwijderd
  - ESLint configuratie gestandaardiseerd
- [x] Code reorganisatie
  - [x] Next.js code verplaatst van next-src naar root
  - [x] Import paths geüpdatet
  - [x] Vite configuratie verwijderd
  - [x] API routes geïmplementeerd
    - Session management
    - Deepgram token generatie
    - OpenAI integratie
  - [x] Oude src directory opgeschoond
- [x] Landing page
  - Modern design met hero sectie
  - Google login integratie
  - Feature highlights
  - Dark mode ondersteuning
- [x] Dashboard implementatie
  - Feature cards met iconen
  - Responsive design
  - Dark mode ondersteuning
  - Navigatie menu
  - Route structuur opgezet met route groups
- [x] Transcriptie functionaliteit
  - [x] Deepgram API route opgezet voor token generatie
  - [x] Audio opname component gemigreerd
    - Real-time transcriptie
    - Volume visualisatie
    - Automatische stop na stilte
    - Verbeterde error handling
  - [x] Transcriptie verwerking geïmplementeerd
  - [x] UI voor transcriptie resultaten
  - [x] Notitie integratie
    - Directe opslag van transcripties
    - Bewerken voor opslaan
    - Real-time preview
- [x] Route structuur geoptimaliseerd
  - [x] Route groups geïmplementeerd voor betere organisatie
  - [x] Middleware geoptimaliseerd voor client-side gebruik
  - [x] API routes voor authenticatie gescheiden
  - [x] Publieke en beschermde routes correct geconfigureerd
- [x] Build optimalisaties
  - [x] Webpack configuratie aangepast voor Node.js modules
  - [x] Firebase Admin SDK correct afgehandeld
  - [x] Polyfills en fallbacks geoptimaliseerd
  - [x] Client-side bundle size geoptimaliseerd

### Huidige taken
- [ ] Notities functionaliteit
  - [x] Notitie editor component
  - [ ] Firestore integratie voor notities
  - [ ] CRUD operaties voor notities
  - [ ] Notities lijst component

### Volgende stappen (geprioriteerd)
1. Notities systeem migreren
2. Dashboard layout voltooien
3. Overige pagina's migreren

### Risico's en aandachtspunten
- ✅ Path aliasing geconfigureerd voor @/ imports
- ✅ API routes geïmplementeerd volgens Next.js conventies
- ✅ Session management getest en werkend
- ✅ Deepgram API integratie getest
- ✅ Firebase authenticatie volledig werkend
- ✅ Landing page en dashboard geïmplementeerd
- ✅ Transcriptie systeem volledig werkend
- ✅ Codebase opgeschoond en consistent
- ✅ Node.js modules correct afgehandeld in client
- ⚠️ OpenAI integratie moet nog getest worden
- ⚠️ Firebase Admin SDK configuratie vereist de juiste environment variables

### Tijdlijn update
- Bestede tijd: ~15-16 uur
- Geschatte resterende tijd: 2-7 uur
  - Notities systeem: 2-4 uur
  - UI/UX afronding: 1-2 uur

### Project structuur
```
/
├── frontend-web/           # Next.js frontend applicatie
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/       # Authenticatie routes
│   │   │   ├── login/    # Login pagina
│   │   │   └── register/ # Registratie pagina
│   │   ├── (public)/     # Publieke routes
│   │   │   ├── page.tsx  # Landing page
│   │   │   └── features/ # Features overzicht
│   │   ├── api/          # API endpoints
│   │   │   ├── auth/     # Authenticatie endpoints
│   │   │   │   ├── session/ # Sessie management
│   │   │   │   └── verify/  # Sessie verificatie
│   │   │   ├── deepgram/ # Deepgram integratie
│   │   │   └── openai/   # OpenAI integratie
│   │   ├── notes/        # Notities feature
│   │   ├── transcribe/   # Transcriptie feature
│   │   ├── ai-generator/ # AI generatie feature
│   │   ├── tasks/        # Taken feature
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Dashboard (na login)
│   ├── components/       # React componenten
│   │   ├── ui/          # Atomic/UI componenten
│   │   ├── layout/      # Layout componenten
│   │   └── features/    # Feature componenten
│   ├── context/         # React Context providers
│   ├── lib/            # Gedeelde logica en utilities
│   ├── locales/        # Vertalingen
│   ├── styles/         # Styling en thema's
│   ├── types/          # TypeScript types
│   └── public/         # Statische bestanden
├── backend/            # Backend services
├── database/          # Database configuratie
└── docs/             # Projectdocumentatie
```

### Environment Variables
```
# Firebase Web SDK
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Firebase Admin SDK
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# API Keys
DEEPGRAM_API_KEY=
OPENAI_API_KEY=

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Monitoring & Rollback Plan
- Development server draait op `http://localhost:3000`
- Git branch `feature/nextjs-migration` voor rollback punt
- API endpoints gevalideerd en werkend
- Session management getest en functioneel
- Path aliasing geconfigureerd en werkend
- Google Authentication flow getest en werkend
- Transcriptie systeem volledig functioneel
- Codebase opgeschoond en consistent met Next.js best practices
- Node.js modules correct afgehandeld in client-side code

## Ondersteuning
- Technische documentatie bijgewerkt
- Migratieplan actief onderhouden
- Volgende update: Na implementatie notities systeem