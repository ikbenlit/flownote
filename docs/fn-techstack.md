## Frontend (Web)
- **Framework**: React + Vite + TypeScript → Voor een snelle en modulaire web app
- **UI Styling**: 
  - Tailwind CSS → Voor gestroomlijnde en responsive styling
  - Custom fonts: Architects Daughter, Patrick Hand, Caveat, Kalam → Voor een persoonlijke touch
- **Routing**: React Router → Voor paginanavigatie
- **Editor**: TipTap → Voor rijke tekstbewerking met aangepaste extensies
- **State Management**: React Context API → Voor globaal state beheer
- **Authentication**: Firebase Authentication → Voor gebruikersbeheer
- **Database**: Firebase Firestore → Voor data opslag en realtime updates

📂 **Key Frontend Files:**
- `App.tsx` → Hoofdcomponent met routing en providers
- `pages/` → Pagina componenten:
  - `DashboardPage.tsx` → Dashboard met recente notities en snelle acties
  - `NotesPage.tsx` → Overzicht van alle notities
  - `NoteEditPage.tsx` → Bewerken van bestaande notities
  - `NewNotePage.tsx` → Aanmaken van nieuwe notities
  - `AIGeneratorPage.tsx` → AI-gestuurde tekstgeneratie
  - `TranscriptionPage.tsx` → Audio opname en transcriptie
- `components/` → Herbruikbare componenten:
  - `NoteEditor.tsx` → Rijke tekstbewerker met taakmarkeringen
  - `AIAssistant.tsx` → AI-tekstgeneratie assistent
  - `AuthButton.tsx` → Authenticatie knoppen
  - `NotesList.tsx` → Notitie overzichtscomponent

## Backend & Services
- **Authentication**: Firebase Authentication met Google login
- **Database**: Firebase Firestore
  - Collections: notes, tasks
  - Security Rules: Gebruiker-specifieke toegangscontrole
  - Offline support: Multi-tab persistence
- **AI Services**:
  - **OpenAI API** → Voor AI-gestuurde tekstgeneratie
  - **Deepgram API** → Voor Nederlandse spraak-naar-tekst transcriptie (gepland)

## Huidige Features ✅
- Gebruikersauthenticatie met Google
- Notities CRUD operaties
- Rijke tekstbewerking met TipTap
- Taakmarkeringen in notities
- Taakextractie uit gemarkeerde tekst
- Dark mode ondersteuning
- Responsive design
- Offline ondersteuning
- AI-gestuurde tekstgeneratie
- Tags voor notities
- Dashboard met recente notities

## Geplande Features 🚀
- [ ] Spraak-naar-tekst transcriptie
- [ ] Kanban board voor taken
- [ ] Taakprioriteiten en filters
- [ ] Realtime samenwerking
- [ ] Geavanceerde zoekfunctionaliteit
- [ ] Notitie-categorieën
- [ ] Notitie-sjablonen
- [ ] Exporteren van notities
- [ ] Extra authenticatiemethoden
- [ ] Notificaties en herinneringen