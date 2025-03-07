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

### 3.3 Wachtwoord Reset (/auth/reset-password)
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
  - Sidebar met hoofdfuncties
  - Top bar met gebruiker menu
  - Breadcrumbs voor locatie
  - Mobile-responsive menu

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
