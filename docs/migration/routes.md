# FlowNote Routes & Features

## Publieke Routes

### Landing Page (`/`)
- Hoofdpagina voor niet-ingelogde gebruikers
- Features showcase
- Call-to-action knoppen
- Taal selector
- Thema schakelaar

### Login Page (`/login`)
- Google authenticatie
- Redirect naar laatst bezochte pagina
- Thema schakelaar

## Beveiligde Routes
Alle onderstaande routes vereisen authenticatie en zijn gewikkeld in `PrivateRoute` component.

### Dashboard (`/app`)
- Overzicht van recente activiteiten
- Snelkoppelingen naar hoofdfuncties
- Persoonlijke statistieken

### Transcriptie (`/transcribe`)
- Audio opname functionaliteit
- Real-time transcriptie via Deepgram
- Opslag van transcripties

### Notities

#### Notities Overzicht (`/notes`)
- Grid/lijst weergave van notities
- Zoek- en filterfunctionaliteit
- Sorteermogelijkheden

#### Notitie Detail (`/notes/:id`)
- Volledige notitie weergave
- Verwijder functionaliteit
- Navigatie terug naar overzicht

#### Notitie Bewerken (`/notes/edit/:id`)
- Notitie editor
- Tags beheer
- Opslaan/annuleren acties

#### Nieuwe Notitie (`/notes/new`)
- Lege notitie editor
- Tags toevoegen
- Template selectie

#### Nieuwe Notitie van Transcriptie (`/notes/new-from-transcription`)
- Transcriptie naar notitie conversie
- Bewerkingsmogelijkheden
- Tags toevoegen

### AI Generator (`/ai-generator`)
- AI tekst generatie interface
- Template selectie
- OpenAI integratie

### Taken (`/tasks`)
- Takenlijst weergave
- Taak management
- Prioriteiten instelling

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
