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
- Systeem: Firebase Firestore voor flexibele, schaalbare opslag van gebruikersdata, notities en taken.
- Collecties: 'notes' en 'tasks' met gebruikersspecifieke toegangscontrole.
- Indexen: Samengestelde indexen voor efficiënte queries op basis van gebruikers-ID en sorteervelden.
- Beveiligingsregels: Strikte regels die ervoor zorgen dat gebruikers alleen hun eigen data kunnen lezen en schrijven.
- Persistentie: Multi-tab IndexedDB persistentie voor offline functionaliteit en betere gebruikerservaring.

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
- Bekende problemen en oplossingen:
  - Probleem: Automatisch sluiten van editor bij opmaak - De editor sloot automatisch wanneer gebruikers opmaak toevoegden omdat de opmaakknoppen geen expliciet `type="button"` attribuut hadden, waardoor ze als `type="submit"` werden behandeld en het formulier verzonden.
  - Oplossing: Toevoegen van `type="button"` aan alle opmaakknoppen in de EditorToolbar en BubbleMenu componenten om te voorkomen dat ze het formulier verzenden. De editor sluit nu alleen wanneer de gebruiker bewust op de "Opslaan" knop klikt.
  - Technische details: In HTML-formulieren hebben knoppen standaard een `type="submit"` als er geen expliciete type is opgegeven. Door `type="button"` toe te voegen aan opmaakknoppen, voeren ze alleen hun opmaakfunctie uit zonder het formulier te verzenden.

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
- Taakmarkering:
  - TaskMarkExtension: Aangepaste TipTap extensie voor het markeren van tekst als taken
  - Interactief: Klikbare markeringen met unieke ID's en positie-tracking
  - Extractie: Automatische taakcreatie bij klikken op markeringen
- UI: React-component met kolommen ("To Do", "In Progress", "Done")
- Interactie: Drag-and-drop met een library zoals react-beautiful-dnd
- Backend: API-endpoints voor CRUD-operaties op taken (create, read, update, delete)
- Database: Taken worden in PostgreSQL opgeslagen met relaties naar bronnotities
- Attributen:
  - Taak ID (UUID)
  - Titel (geëxtraheerde tekst)
  - Status (todo, in progress, done)
  - Bron-notitie referentie
  - Start- en eindpositie in notitie
  - Gebruikers-ID voor eigenaarschap

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
    Gebruik Firebase Firestore SDK voor interactie met de database.
    Definieer collecties: notes, tasks met userId voor eigenaarschap.
    Implementeer retry-logica en error handling voor Firestore operaties.
    Gebruik samengestelde indexen voor efficiënte queries.
- Authenticatie:
  - Frontend: 
    - Gebruik AuthContext voor centrale authenticatiestatus.
    - Implementeer PrivateRoute voor routebeveiliging.
    - Toon duidelijke feedback tijdens authenticatieprocessen.
  - Backend: 
    - Valideer Firebase tokens bij elke beveiligde API-aanroep.
    - Koppel gebruikers-ID's aan alle gebruikersspecifieke data.
- Prestaties:
    Minimaliseer renders in React met useMemo/useCallback.
    Gebruik lazy loading voor componenten en assets.
    Benut Firestore multi-tab persistentie voor offline functionaliteit.

## Technische Vereisten ##
- Dependencies:
  - Frontend: react, react-router-dom, vite, typescript, tailwindcss, axios, react-beautiful-dnd, firebase, @tiptap/react.
  - Backend: express, typescript, firebase-admin, axios.
- Omgeving:
  - Node.js v18+, Firebase project met Firestore en Authentication, API-keys voor Deepgram en OpenAI.
- Deployment:
  - Frontend: Static hosting (Vercel/Netlify).
  - Backend: Server (Render/Heroku).
- Firebase Configuratie:
  - Firestore Security Rules: Regels die ervoor zorgen dat gebruikers alleen hun eigen data kunnen lezen en schrijven.
  - Firestore Indexes: Samengestelde indexen voor notes (userId, updatedAt, __name__) en tasks (userId, position, __name__).
  - Authentication: Google-authenticatie ingeschakeld.

## Toekomstige Overwegingen ##
- Offline Modus: Verbeter de bestaande Firestore multi-tab persistentie met aangepaste offline-first strategieën.
- AI-verbeteringen: Voeg contextbewuste prompts toe voor gepersonaliseerde output.
- Schaalbaarheid: Benut Firestore's automatische schaalbaarheid en overweeg sharding bij extreme groei.
- Authenticatie-uitbreidingen: Implementeer e-mail/wachtwoord login, sociale media login, en multi-factor authenticatie.
- Realtime Samenwerking: Gebruik Firestore's realtime updates voor collaboratieve notitie-bewerking.
- Geavanceerde Queries: Implementeer Firestore composite queries voor complexere zoekfunctionaliteit.