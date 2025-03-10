## Flownote: Technische Leidraad voor een Moderne Notitie- en Taakbeheerapplicatie

Flownote is een webgebaseerde applicatie die notitie- en taakbeheerfunctionaliteit integreert met moderne technologieën zoals AI-gebaseerde tekstgeneratie en spraak-naar-tekst transcriptie. Het doel is om gebruikers een naadloze ervaring te bieden voor het vastleggen, bewerken en organiseren van gedachten en taken.

# Technische Architectuur
De applicatie is gebouwd als een moderne full-stack applicatie met de volgende componenten:

**Frontend & Backend:**
- Framework: Next.js 14 met App Router en TypeScript
- Styling: Tailwind CSS met custom fonts (Architects Daughter, Patrick Hand, Kalam)
- State Management: React Context API voor globale state
- Editor: TipTap met aangepaste extensies voor taakmarkeringen
- Routing: Next.js App Router met route groups en middleware
- API Routes: Geïntegreerde serverless endpoints

**Backend Services:**
- Authentication: Firebase Authentication & Admin SDK
  - Google login integratie
  - Session cookie beveiliging
  - Middleware voor route bescherming
- Database: Firebase Firestore
  - Collections: notes, tasks
  - Real-time updates
  - Offline support via multi-tab persistence
  - Beveiligingsregels voor gebruiker-specifieke toegang
- AI Services:
  - OpenAI API voor tekstgeneratie
  - Deepgram API voor spraak-naar-tekst

## Kernfunctionaliteiten

1. Gebruikersauthenticatie
- Implementatie: Firebase Authentication met session cookies
- Features:
  - Veilige inlog/uitlog
  - Persistente sessies via cookies
  - Middleware voor route bescherming
  - API route voor sessie verificatie
  - Gebruiker-specifieke data isolatie

2. Notitiebewerking
- Implementatie: TipTap editor met aangepaste extensies
- Features:
  - Rijke tekstopmaak (koppen, lijsten, links)
  - Taakmarkeringen
  - Real-time opslaan
  - Offline ondersteuning
  - Tags voor organisatie
  - Dark mode ondersteuning

3. Taakbeheer
- Implementatie: Geïntegreerd met notities via TaskMarkExtension
- Features:
  - Markeren van tekst als taken
  - Automatische taakextractie
  - Koppeling tussen taken en bronnotities
  - Taakstatus tracking
  - Responsive takenlijst

4. AI-integratie
- Implementatie: OpenAI & Deepgram via API routes
- Features:
  - Tekstgeneratie via OpenAI API
  - Real-time spraak-naar-tekst via Deepgram WebSocket API
  - Directe WebSocket communicatie voor transcriptie
  - Nederlandse taalondersteuning
  - Real-time audio processing
  - Visuele feedback tijdens opname
  - Automatische stiltedetectie
  - Smart formatting van transcripties

## Technische Details

### Frontend Architectuur
1. Route Structuur:
- (auth): Authenticatie routes (login, register)
- (public): Publieke routes (landing, features)
- api: API endpoints
- notes: Notities feature
- transcribe: Transcriptie feature
- ai-generator: AI generatie feature
- tasks: Taken feature

2. Component Structuur:
- components/ui: Atomic design componenten
- components/layout: Layout componenten
- components/features: Feature-specifieke componenten

3. State Management:
- AuthContext: Authenticatie status
- NoteContext: Notitie CRUD operaties
- TaskContext: Taakbeheer
- I18nContext: Vertalingen

4. Data Flow:
- Server-side rendering waar mogelijk
- Client-side updates voor interactiviteit
- API routes voor server-side logica
- Real-time Firestore synchronisatie

### Database Schema
1. Notes Collection:
```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  taskMarkings: TaskMarking[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
}
```

2. Tasks Collection:
```typescript
interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  sourceNoteId: string;
  sourceNoteTitle: string;
  extractedText: string;
  position: number;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Ontwikkelingsrichtlijnen

1. Code Organisatie:
- Next.js App Router conventies
- Route groups voor logische groepering
- API routes voor server-side logica
- TypeScript voor type-veiligheid
- Modulaire componenten en hooks

2. State Management:
- Server Components waar mogelijk
- Client Components voor interactiviteit
- Context voor globale state
- Optimistische UI updates

3. Performance:
- Server-side rendering
- Route groups voor code-splitting
- Streaming waar mogelijk
- Efficiënte Firestore queries
- Geoptimaliseerde client bundle

4. Security:
- Session cookie authenticatie
- API route verificatie
- Middleware bescherming
- Firebase Admin SDK server-side
- Firestore Security Rules

## Toekomstige Uitbreidingen

1. Korte Termijn:
- Notities systeem migratie
- Dashboard layout voltooiing
- Geavanceerde zoekfunctionaliteit
- Notitie-sjablonen

2. Middellange Termijn:
- Realtime samenwerking
- Notitie-categorieën
- Exporteren van notities
- Extra authenticatiemethoden

3. Lange Termijn:
- Mobile apps
- Offline-first PWA
- End-to-end encryptie
- API voor third-party integraties