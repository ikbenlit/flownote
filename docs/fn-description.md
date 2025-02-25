## Flownote: Technische Leidraad voor de Bouw van een Spraakgestuurde Notitie- en Taakbeheerapplicatie
Flownote is een webgebaseerde applicatie die spraak-naar-tekst-transcriptie, AI-gebaseerde tekstgeneratie en taakbeheerfunctionaliteit integreert. Het doel is om gebruikers een naadloze ervaring te bieden voor het vastleggen, bewerken en organiseren van gedachten via spraak, met behulp van moderne technologieën. Deze leidraad beschrijft de technische architectuur, kernfunctionaliteiten en ontwikkelingsrichtlijnen voor de MVP.

# Technische Architectuur
De applicatie is modulair opgebouwd met de volgende componenten:
**Frontend:**
- Framework: React met Vite en TypeScript.
- Styling: Tailwind CSS voor responsieve en schaalbare UI.
- State Management: React Context API voor globale state, aangevuld met lokale state waar geschikt.

**Backend:**
- Server: Node.js met Express en TypeScript.
- Rol: API-endpoints voor communicatie met de frontend, database en externe services.

**Database:**
- Systeem: PostgreSQL voor gestructureerde opslag van gebruikersdata, notities en taken.
- Queries: Parameterized SQL-queries om beveiliging te waarborgen (tegen SQL-injectie).

**Authenticatie:**
- Dienst: Firebase Authentication voor gebruikersregistratie en -login.
- Implementatie: 
  - Frontend: AuthContext provider voor statusbeheer, AuthButton component voor UI, en PrivateRoute component voor routebeveiliging.
  - Backend: Validatie van Firebase tokens via Firebase Admin SDK.
- Functionaliteit: Google-authenticatie met popup, statusbeheer, en beveiligde routes.

**Externe Services:**
- Spraak-naar-tekst: Deepgram API voor real-time transcriptie (met Nederlandse taalondersteuning).
- Tekstgeneratie: OpenAI API voor AI-gestuurde tekstverwerking en -generatie.

## Kernfunctionaliteiten
1. Gebruikersauthenticatie
- Doel: Beveiligde toegang tot de applicatie met gebruikersspecifieke content.
*Technische Implementatie:*
  - AuthContext: React Context voor het beheren van de authenticatiestatus en gebruikersgegevens.
  - AuthButton: UI-component die dynamisch wisselt tussen inlog- en uitlogfunctionaliteit.
  - PrivateRoute: Component voor het beveiligen van routes, met automatische doorverwijzing naar de inlogpagina.
  - LoginPage: Dedicated pagina voor gebruikersauthenticatie met Google.
- Beveiliging: Firebase Authentication voor veilige gebruikersverificatie en tokenbeheer.

2. Spraakopname en Transcriptie
- Doel: Spraak omzetten naar bewerkbare tekst in real-time.
*Technische Implementatie:*
    Frontend gebruikt de Web Audio API om audio op te nemen en streamt dit naar de backend.
    Backend roept de Deepgram API aan met de audio-input en ontvangt getranscribeerde tekst.
    Resultaat wordt opgeslagen in PostgreSQL, gekoppeld aan de gebruikers-ID.
- Beveiliging: Audio-data wordt tijdelijk verwerkt en niet permanent opgeslagen.

3. Notitiebewerking
- Doel: Gebruikers kunnen getranscribeerde tekst aanpassen en opmaken.
*Technische Implementatie:*
- Rijke Teksteditor: Gebruik een library zoals Quill of TinyMCE met basisfunctionaliteit (vet, cursief, lijsten).
- Synchronisatie: Wijzigingen worden real-time opgeslagen in de database via API-calls.
- API: POST/PUT-endpoints voor het opslaan en bijwerken van notities.

4. AI-gebaseerde Tekstgeneratie
- Doel: Tekst genereren of verbeteren op basis van gebruikersinput en geselecteerde teksttypes.
*Technische Implementatie:*
    Frontend biedt een dropdown met teksttypes (blog, e-mail, verslag, social post, taak).
    Backend construeert een prompt en roept de OpenAI API aan met de geselecteerde input en type.
    Gegenereerde tekst wordt geretourneerd naar de frontend en weergegeven in de editor.
- Optimalisatie: Rate-limiting en caching van API-aanroepen om kosten te beheersen.

5. Teksttypes en Formattering
- Doel: Structuur aanbrengen in tekst op basis van het gekozen type.
*Technische Implementatie:*
    Elk teksttype heeft een sjabloon (bijv. e-mail: aanhef, body, afsluiting).
    Backend slaat de tekst op met metadata (type, timestamp, gebruikers-ID) in PostgreSQL.
    Frontend rendert de tekst volgens het sjabloon met Tailwind CSS-styling.

6. Taakbeheer met Kanban/Swimminglanes
- Doel: Taken organiseren en beheren in een visueel Kanban-board.
*Technische Implementatie:*
- UI: React-component met kolommen ("To Do", "In Progress", "Done").
- Interactie: Drag-and-drop met een library zoals react-beautiful-dnd.
- Backend: API-endpoints voor CRUD-operaties op taken (create, read, update, delete).
    Taken worden in PostgreSQL opgeslagen en kunnen worden gekoppeld aan notities via een relationele tabel.

## Ontwikkelingsrichtlijnen ##
- Modulariteit:
    Scheid componenten (UI), services (API-calls), en modellen (data-structuren) voor herbruikbaarheid.
- Typeveiligheid:
    Gebruik TypeScript interfaces en types overal in de codebase.
    Definieer DTO's (Data Transfer Objects) voor API-communicatie.
- API-communicatie:
    Gebruik Axios of Fetch met async/await en try-catch voor foutafhandeling.
    Implementeer timeouts en retries voor externe API's (Deepgram, OpenAI).
- Database:
    Gebruik een ORM (bijv. Prisma) of raw SQL met parameterized queries.
    Definieer tabellen: users, notes, tasks met foreign keys waar nodig.
- Authenticatie:
  - Frontend: 
    - Gebruik AuthContext voor centrale authenticatiestatus.
    - Implementeer PrivateRoute voor routebeveiliging.
    - Toon duidelijke feedback tijdens authenticatieprocessen.
  - Backend: 
    - Valideer JWT-tokens bij elke beveiligde API-aanroep.
    - Koppel gebruikers-ID's aan alle gebruikersspecifieke data.
- Prestaties:
    Minimaliseer renders in React met useMemo/useCallback.
    Gebruik lazy loading voor componenten en assets.

## Technische Vereisten ##
- Dependencies:
  - Frontend: react, react-router-dom, vite, typescript, tailwindcss, axios, react-beautiful-dnd, firebase.
  - Backend: express, typescript, pg (PostgreSQL), firebase-admin, axios.
- Omgeving:
  - Node.js v18+, PostgreSQL v15+, API-keys voor Firebase, Deepgram en OpenAI.
- Deployment:
  - Frontend: Static hosting (Vercel/Netlify).
  - Backend: Server (Render/Heroku) met PostgreSQL-instantie.

## Toekomstige Overwegingen ##
- Offline Modus: Implementeer lokale opslag (IndexedDB) en synchronisatie bij connectiviteit.
- AI-verbeteringen: Voeg contextbewuste prompts toe voor gepersonaliseerde output.
- Schaalbaarheid: Overweeg load balancing en database-replicatie bij groei.
- Authenticatie-uitbreidingen: Implementeer e-mail/wachtwoord login, sociale media login, en multi-factor authenticatie.