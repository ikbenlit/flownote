# FlowNote Pagina Flow

## 1. Route Structuur
- **(public)/** - Publiek toegankelijke routes
  - `/` - Marketing landingspagina
  - `/privacy` - Privacy policy
  - `/terms` - Terms of service
- **(auth)/** - Authenticatie routes
  - `/login` - Inloggen
  - `/register` - Registratie
  - `/reset-password` - Wachtwoord reset
- **/** - App routes (beschermd)
  - `/` - Dashboard
  - `/notes` - Notities
  - `/tasks` - Taken
  - `/ai-generator` - AI Generator
  - `/transcribe` - Transcriptie

## 2. Publieke Landingspagina (/public/)
- **Doel**: Bezoekers informeren en converteren naar gebruikers
- **Componenten**:
  - Hero sectie met value proposition
    - "Verhoog je Productiviteit met AI"
    - Call-to-action knoppen (Gratis Starten/Inloggen)
  - Features sectie
    - Transcriptie
    - Slimme Notities
    - AI Assistent
    - Slim Takenbeheer
  - Social proof sectie met testimonials
  - Afsluitende CTA sectie
  - SEO optimalisatie
    - Meta tags
    - Open Graph tags
    - Structured data
    - Performance optimalisatie

## 3. Authenticatie Flow
### 3.1 Registratie (/auth/register)
- **Doel**: Nieuwe gebruikers registreren
- **Flow**:
  1. Basis informatie invullen
     - Email
     - Wachtwoord
     - Naam
  2. Email verificatie
  3. Welkomstscherm met korte tour
  4. Doorverwijzing naar dashboard

### 3.2 Inloggen (/auth/login)
- **Doel**: Bestaande gebruikers toegang geven
- **Opties**:
  - Email/wachtwoord combinatie
  - Social login (Google, GitHub)
  - "Wachtwoord vergeten" functionaliteit
  - Link naar registratie

### 3.3 Uitloggen (/auth/logout)
- **Doel**: Veilig uitloggen van gebruikers
- **Flow**:
  1. Uitlog-actie triggeren via gebruikersmenu
  2. Bevestigingsdialoog tonen (optioneel voor belangrijke wijzigingen)
  3. Bij bevestiging:
     - Alle actieve sessies beëindigen
     - Local storage en cookies opschonen
     - JWT tokens verwijderen
  4. Redirect naar landingspagina (/) met bevestigingsmelding
  5. Mogelijkheid om opnieuw in te loggen

### 3.4 Wachtwoord Reset (/auth/reset-password)
- Email invoeren
- Reset link versturen
- Nieuw wachtwoord instellen

## 4. Dashboard (/)
- **Doel**: Centrale hub voor alle functionaliteit
- **Componenten**:
  - Welkom sectie met gebruikersnaam
  - Quick Actions
    - Nieuwe notitie maken
    - Nieuwe transcriptie starten
    - Nieuwe taak toevoegen
    - AI sessie starten
  - Recente activiteiten
  - Statistieken
    - Aantal notities
    - Aantal taken
    - Aantal transcripties
    - Aantal AI sessies

## 5. Hoofdfuncties
### 5.1 Notes (/notes)
- Overzicht van notities
- Nieuwe notitie maken (/notes/new)
- Zoeken en filteren

### 5.2 Tasks (/tasks)
- Takenlijst overzicht
- Nieuwe taken toevoegen (/tasks/new)
- Prioriteiten beheren

### 5.3 AI Generator (/ai-generator)
- AI assistentie interface
- Template selectie
- Resultaat weergave

### 5.4 Transcribe (/transcribe)
- Audio upload interface
- Transcriptie status
- Resultaat bewerken

## 6. Navigatie Structuur
- **Publieke navigatie**:
  - Logo -> Home
  - Features
  - Prijzen
  - Login/Registreer knoppen

- **App navigatie**:
  ### 6.1 Sidebar
  - **Mobile (< 768px)**:
    - Verborgen by default
    - Hamburger menu voor toggle
    - Full-screen overlay bij opening
    - Swipe gesture ondersteuning
    - Automatisch sluiten na selectie

  - **Desktop (≥ 768px)**:
    - Permanent zichtbaar
    - Collapsible voor meer ruimte
    - Hover states voor interactie

  - **Structuur (top-to-bottom)**:
    1. Logo/App naam (met link naar dashboard)
    2. Hoofdfuncties:
       - Dashboard
       - Notities
       - Taken
       - AI Generator
       - Transcriptie
    3. Divider
    4. Instellingen sectie:
       - Thema toggle (dark/light)
       - Gebruikersvoorkeuren
       - Taalinstellingen
    5. Gebruikerssectie (onderaan):
       - Profielafbeelding
       - Gebruikersnaam
       - Uitlog optie

  - **Visuele Hierarchie**:
    - Duidelijke iconen met labels
    - Actieve staat highlighting
    - Subtiele hover effecten
    - Consistente padding/spacing

  ### 6.2 Top bar
  - Alleen zichtbaar op mobile
  - Hamburger menu
  - App titel/logo
  - Quick actions

  ### 6.3 Breadcrumbs
  - Locatie indicator
  - Navigatie geschiedenis

  ### 6.4 Responsive gedrag
  - Vloeiende transities
  - Gesture support op mobile
  - Keyboard navigatie op desktop

## 7. Error Pages
- 404 Not Found
- 403 Forbidden
- 500 Server Error
- Onderhoudspagina

## 8. Responsive Design
- Mobile-first approach
- Tablet optimalisatie
- Desktop optimalisatie
- Progressive Web App (PWA) functionaliteit

## 9. Beveiligingslagen
1. **Publieke laag**:
   - Marketing pagina's
   - Auth pagina's
   - Documentatie

2. **Beveiligde laag**:
   - Dashboard
   - Alle app functionaliteit
   - Gebruikersinstellingen
   - API endpoints
