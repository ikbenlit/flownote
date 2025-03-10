## Frontend & Backend (Next.js)
- **Framework**: Next.js 14 + TypeScript → Voor een full-stack applicatie met server-side rendering
- **UI Styling**: 
  - Tailwind CSS → Voor gestroomlijnde en responsive styling
  - Custom fonts: Architects Daughter, Patrick Hand, Kalam → Voor een persoonlijke touch
- **Routing**: Next.js App Router → Voor server-side routing en route groups
- **Editor**: TipTap → Voor rijke tekstbewerking met aangepaste extensies
- **State Management**: React Context API → Voor globaal state beheer
- **Authentication**: Firebase Authentication & Admin SDK → Voor gebruikersbeheer en sessie verificatie
- **Database**: Firebase Firestore → Voor data opslag en realtime updates

📂 **Key Files & Directories:**
- `app/` → Next.js App Router structuur:
  - `(auth)/` → Authenticatie routes:
    - `login/` → Login pagina met Google authenticatie
    - `register/` → Registratie pagina
  - `(public)/` → Publieke routes:
    - `page.tsx` → Landing page
    - `features/` → Features overzicht
  - `api/` → API endpoints:
    - `auth/` → Authenticatie endpoints
    - `deepgram/` → Transcriptie API
    - `openai/` → AI generatie API
  - `notes/` → Notities feature
  - `transcribe/` → Transcriptie feature
  - `ai-generator/` → AI generatie feature
  - `tasks/` → Taken feature
  - `layout.tsx` → Root layout met providers
  - `page.tsx` → Dashboard (na login)
- `components/` → Herbruikbare componenten:
  - `ui/` → Atomic design componenten
  - `layout/` → Layout componenten
  - `features/` → Feature-specifieke componenten

## Backend Services
- **Authentication**: 
  - Firebase Authentication met Google login
  - Session cookie authenticatie
  - Middleware voor route bescherming
  - API routes voor sessie verificatie
- **Database**: Firebase Firestore
  - Collections: notes, tasks
  - Security Rules: Gebruiker-specifieke toegangscontrole
  - Offline support: Multi-tab persistence
- **AI Services**:
  - **OpenAI API** → Voor AI-gestuurde tekstgeneratie via API routes
  - **Deepgram API** → Voor Nederlandse spraak-naar-tekst transcriptie:
    - Directe WebSocket verbinding
    - Real-time audio streaming
    - Smart formatting & interim resultaten
    - Automatische stiltedetectie
    - Volume visualisatie

## Huidige Features ✅
- Gebruikersauthenticatie met Google en session cookies
- Notities CRUD operaties
- Rijke tekstbewerking met TipTap
- Taakmarkeringen in notities
- Taakextractie uit gemarkeerde tekst
- Dark mode ondersteuning
- Responsive design
- Offline ondersteuning
- AI-gestuurde tekstgeneratie
- Real-time spraak-naar-tekst transcriptie
- Tags voor notities
- Dashboard met recente notities
- Server-side rendering
- Route bescherming via middleware
- API routes voor server-side logica

## Geplande Features 🚀
- [ ] Notities systeem migratie voltooien
- [ ] Dashboard layout voltooien
- [ ] Kanban board voor taken
- [ ] Taakprioriteiten en filters
- [ ] Realtime samenwerking
- [ ] Geavanceerde zoekfunctionaliteit
- [ ] Notitie-categorieën
- [ ] Notitie-sjablonen
- [ ] Exporteren van notities
- [ ] Extra authenticatiemethoden
- [ ] Notificaties en herinneringen