# FlowNote Routes & Features

## Route Groepen

### Publieke Routes (`(public)`)
- Landing Page (`/`)
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

### Authenticatie Routes (`(auth)`)
- Login (`/login`)
- Registratie (`/register`)
- Wachtwoord Reset (`/reset-password`)

### App Routes (`(app)`)
Alle onderstaande routes vereisen authenticatie.

#### Dashboard (`/dashboard`)
- Overzicht van recente activiteiten
- Snelkoppelingen naar hoofdfuncties
- Persoonlijke statistieken

#### Notities (`/notes`)
- Grid/lijst weergave van notities
- Zoek- en filterfunctionaliteit
- Sorteermogelijkheden
- Detail pagina's:
  - `/notes/:id` - Notitie bekijken
  - `/notes/edit/:id` - Notitie bewerken
  - `/notes/new` - Nieuwe notitie
  - `/notes/new-from-transcription` - Van transcriptie

#### AI Generator (`/ai-generator`)
- AI tekst generatie interface
- Template selectie
- OpenAI integratie

#### Taken (`/tasks`)
- Takenlijst weergave
- Taak management
- Prioriteiten instelling

## Metadata & Viewport

Alle pagina's gebruiken de nieuwe Next.js 14+ metadata en viewport configuratie:

```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'Paginatitel - FlowNote',
  description: 'Pagina beschrijving'
}
```

## API Routes

### OpenAI Routes (`/api/openai`)
- POST `/api/openai/generate`: Tekst generatie endpoint

### Deepgram Routes (`/api/deepgram-token`)
- GET: Genereren van tijdelijke Deepgram tokens

## Features per Component

### MainLayout
- Responsive sidebar
- Navigatie menu
- Thema ondersteuning
- Gebruikersmenu

### Sidebar
- Inklapbare navigatie
- Iconen + labels
- Actieve route indicatie
- Gebruikersmenu

### Authenticatie
- Google Sign-in
- Sessie beheer
- Beveiligde routes
- Redirect logica

### Notities Systeem
- CRUD operaties
- Markdown/Rich text editor
- Tags systeem
- Zoekfunctionaliteit

### AI Integratie
- OpenAI text generatie
- Template systeem
- Context behoud
- Geschiedenis

### Audio Transcriptie
- Real-time opname
- Deepgram integratie
- WebSocket verbinding
- Transcriptie opslag

### Internationalisatie
- Meertalige ondersteuning
- Taal switcher
- Vertaalde content

### Thema Systeem
- Light/Dark mode
- Thema persistentie
- Custom kleuren
- Dynamische overgangen
