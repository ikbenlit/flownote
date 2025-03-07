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
- **(app)/** - App routes (beschermd)
  - `/dashboard` - Dashboard
  - `/notes` - Notities
  - `/tasks` - Taken
  - `/ai-generator` - AI Generator

## 2. Root Route (/)
- **Doel**: Doorverwijzen naar juiste route op basis van authenticatie
- **Flow**:
  1. Loading state tonen
  2. Authenticatie status controleren
  3. Doorverwijzen naar:
     - `/dashboard` voor ingelogde gebruikers
     - `/(public)` voor niet-ingelogde gebruikers

## 3. Publieke Landingspagina (/(public))
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

## 4. Authenticatie Flow
### 4.1 Registratie (/auth/register)
- **Doel**: Nieuwe gebruikers registreren
- **Flow**:
  1. Basis informatie invullen
     - Email
     - Wachtwoord
     - Naam
  2. Email verificatie
  3. Welkomstscherm met korte tour
  4. Doorverwijzing naar dashboard

### 4.2 Inloggen (/auth/login)
- **Doel**: Bestaande gebruikers toegang geven
- **Opties**:
  - Email/wachtwoord combinatie
  - Social login (Google, GitHub)
  - "Wachtwoord vergeten" functionaliteit
  - Link naar registratie

### 4.3 Uitloggen (/auth/logout)
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

### 4.4 Wachtwoord Reset (/auth/reset-password)
- Email invoeren
- Reset link versturen
- Nieuw wachtwoord instellen

## 5. Dashboard (/dashboard)
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

## 6. Hoofdfuncties
### 6.1 Notes (/notes)
- Overzicht van notities
- Nieuwe notitie maken (/notes/new)
- Zoeken en filteren

### 6.2 Tasks (/tasks)
- Takenlijst overzicht
- Nieuwe taken toevoegen (/tasks/new)
- Prioriteiten beheren

### 6.3 AI Generator (/ai-generator)
- AI assistentie interface
- Template selectie
- Resultaat weergave

## 7. Navigatie Structuur
- **Publieke navigatie**:
  - Logo -> Home
  - Features
  - Prijzen
  - Login/Registreer knoppen

- **App navigatie**:
  ### 7.1 Sidebar
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

  ### 7.2 Top bar
  - Alleen zichtbaar op mobile
  - Hamburger menu
  - App titel/logo
  - Quick actions

  ### 7.3 Breadcrumbs
  - Locatie indicator
  - Navigatie geschiedenis

  ### 7.4 Responsive gedrag
  - Vloeiende transities
  - Gesture support op mobile
  - Keyboard navigatie op desktop

## 8. Error Pages
- 404 Not Found
- 403 Forbidden
- 500 Server Error
- Onderhoudspagina

## 9. Responsive Design
- Mobile-first approach
- Tablet optimalisatie
- Desktop optimalisatie
- Progressive Web App (PWA) functionaliteit

## 10. Beveiligingslagen
1. **Publieke laag**:
   - Marketing pagina's
   - Auth pagina's
   - Documentatie

2. **Beveiligde laag**:
   - Dashboard
   - Alle app functionaliteit
   - Gebruikersinstellingen
   - API endpoints

## 11. Metadata & Viewport
Alle pagina's implementeren de nieuwe Next.js 14+ metadata en viewport configuratie:

### Viewport
```typescript
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}
```

### Metadata
```typescript
export const metadata: Metadata = {
  title: string,
  description: string,
  // Optionele velden per pagina
  openGraph?: {
    title: string,
    description: string,
    images: string[]
  }
}
```

### Implementatie per Route Groep
- **(public)/** - SEO geoptimaliseerde metadata
- **(auth)/** - Basis metadata voor authenticatie flows
- **(app)/** - Dynamische metadata op basis van content
