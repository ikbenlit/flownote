# FlowNote Pagina Flow

## 1. Layout Structuur
### 1.1 Root Layout (`/app/layout.tsx`)
- **Doel**: Basis HTML structuur en globale providers
- **Componenten**:
  - HTML/Body structuur
  - Font configuratie (Architects Daughter, Patrick Hand, Kalam)
  - Globale providers:
    - I18nProvider
    - AuthProvider
    - NoteProvider
  - Globale metadata/viewport
  - Globale styling

### 1.2 Route Group Layouts
#### Public Layout (`/app/(public)/layout.tsx`)
- **Doel**: Layout voor publieke documentatie pagina's
- **Features**:
  - SEO-geoptimaliseerde metadata
  - Eenvoudige content layout
  - Indexering door zoekmachines toegestaan

#### Auth Layout (`/app/(auth)/layout.tsx`)
- **Doel**: Layout voor authenticatie pagina's
- **Features**:
  - Auth-specifieke metadata
  - Minimale interface
  - Geen indexering door zoekmachines

#### App Layout (`/app/(app)/layout.tsx`)
- **Doel**: Layout voor beveiligde app routes
- **Features**:
  - Sidebar navigatie
  - App-specifieke metadata
  - Beveiligde route controle via AuthGuard
  - Geen indexering door zoekmachines

## 2. Route Structuur
- **/** - Root route met landing page of dashboard redirect
- **(public)/** - Publieke documentatie routes
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

## 3. Root Route (/)
- **Doel**: Landing page voor niet-ingelogde gebruikers, doorverwijzing voor ingelogde gebruikers
- **Flow**:
  1. Loading state tonen tijdens auth check
  2. Authenticatie status controleren
  3. Gedrag:
     - Voor ingelogde gebruikers: redirect naar `/dashboard`
     - Voor niet-ingelogde gebruikers: tonen marketing landing page
       - Hero sectie
       - Features overzicht
       - Call-to-action knoppen
       - Testimonials

## 4. Landing Page (/)
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

## 5. Authenticatie Flow
### 5.1 Registratie (/auth/register)
- **Doel**: Nieuwe gebruikers registreren
- **Flow**:
  1. Basis informatie invullen
     - Email
     - Wachtwoord
     - Naam
  2. Email verificatie
  3. Welkomstscherm met korte tour
  4. Doorverwijzing naar dashboard

### 5.2 Inloggen (/auth/login)
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
### 8.1 404 Not Found (`/app/not-found.tsx`)
- **Doel**: Minimalistische maar vriendelijke foutmelding voor niet-bestaande pagina's
- **Design**:
  - Pixel art notitieblok met animaties:
    - Bounce effect op notitieblok
    - Druppelende tranen animatie
    - Responsive SVG implementatie
  - Typografie volgens design system:
    - Space Grotesk voor headers
    - Inter voor UI elementen
  - Kleurenpalet:
    - Light mode: Grijstinten met blauwe accenten
    - Dark mode: Aangepaste donkere tinten (#1A1F2B, #2D3341)
- **Features**:
  - Grote, duidelijke 404 indicator
  - Korte, heldere foutmelding
  - Enkele 'Ga terug' navigatie optie
  - Volledig responsive
  - Dark mode ondersteuning
  - Animaties voor visuele feedback
  - Client-side navigatie met window.history

### 8.2 Overige Error Pages (TODO)
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
