# FlowNote Routes & Features

## Layout Structuur

### Root Layout (`/app/layout.tsx`)
- Globale HTML structuur
- Font configuratie
- Provider wrappers
- Globale metadata/viewport

### Route Group Layouts
- **(public)/layout.tsx** - Publieke routes layout
- **(auth)/layout.tsx** - Authenticatie routes layout
- **(app)/layout.tsx** - Beveiligde app routes layout met sidebar

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

### Root Layout
```typescript
export const metadata: Metadata = {
  title: 'FlowNote - Verhoog je Productiviteit met AI',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true }
}
```

### Route Group Metadata
#### Public Routes
```typescript
export const metadata: Metadata = {
  title: 'FlowNote - Verhoog je Productiviteit met AI',
  description: '...',
  robots: { index: true, follow: true }
}
```

#### Auth Routes
```typescript
export const metadata: Metadata = {
  title: 'Inloggen - FlowNote',
  description: '...',
  robots: { index: false, follow: false }
}
```

#### App Routes
```typescript
export const metadata: Metadata = {
  title: 'Dashboard - FlowNote',
  description: '...',
  robots: { index: false, follow: false }
}
```

### Viewport Configuratie
Alle layouts gebruiken dezelfde viewport configuratie:
```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}
```

## API Routes

### OpenAI Routes (`/api/openai`)
- POST `/api/openai/generate`: Tekst generatie endpoint

### Deepgram Routes (`/api/deepgram-token`)
- GET: Genereren van tijdelijke Deepgram tokens

## Features per Component

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

### Internationalisatie
- Meertalige ondersteuning
- Taal switcher
- Vertaalde content

### Thema Systeem
- Light/Dark mode
- Thema persistentie
- Custom kleuren
- Dynamische overgangen
