## Flownote Design System - Rustige Schetswerkplaats UI
**Algemene Visie**
De "Rustige Schetswerkplaats" is een creatieve, rustgevende digitale omgeving waar gebruikers hun gedachten kunnen vastleggen en uitwerken. Het ontwerp combineert een handgetekende, schetsachtige esthetiek met natuurlijke elementen (bomen, bamboe) en moderne AI-functionaliteit, allemaal verpakt in een minimalistisch maar warm jasje met groen-blauwe tinten.

Dit design system combineert de warmte en persoonlijkheid van handgetekende elementen met de functionaliteit van een moderne digitale werkruimte, perfect voor gebruikers die een natuurlijke, creatieve en rustgevende omgeving zoeken voor hun notities, ideeën en taken.

**Kleurenpalet**
*Light Mode Kleuren*
Blauw Primair: #3B82F6 - Gebruikt voor accenten, microfoonknop en interactieve elementen
Blauw Licht: #93C5FD - Voor lichtere blauwe accenten en hover states
Blauw Donker: #2563EB - Voor focus en actieve states

*Secundaire Kleuren*
Groen Primair: #10B981 - Voor navigatie-iconen en secundaire elementen
Groen Licht: #D1FAE5 - Achtergrondkleur die een rustige, natuurlijke sfeer creëert
Groen Donker: #059669 - Voor de AI-toolbox en belangrijke groene elementen

*Neutrale Kleuren (Light Mode)*
Wit: #FFFFFF - Voor hoofdpanelen en content-achtergronden
Grijs 50: #F9FAFB - Voor subtiele achtergrondvariaties
Grijs 100: #F3F4F6 - Voor navigatiepanelen en secundaire achtergronden
Grijs 200: #E5E7EB - Voor lijnvorming en subtiele randen
Grijs 300: #D1D5DB - Voor sterkere randen en dividers
Grijs 800: #1F2937 - Voor hoofdtekst
Grijs 900: #111827 - Voor titels en belangrijke tekst

*Dark Mode Kleuren*
Achtergrond Kleuren:
- Primair: #1A1F2B - Hoofdachtergrond
- Secundair: #242937 - Panelen en kaarten
- Tertiair: #2D3341 - Verhoogde elementen en hover states

Tekst Kleuren:
- Primair: #E2E8F0 - Hoofdtekst
- Secundair: #94A3B8 - Subtiele tekst en labels
- Accent: #7DD3FC - Links en speciale tekst

Rand Kleuren:
- Primair: #374151 - Standaard randen
- Secundair: #4B5563 - Sterkere randen en dividers

Accent Kleuren:
- Blauw: #60A5FA - Primaire acties en focus states
- Blauw Licht: #93C5FD - Secundaire acties en hover states
- Groen: #34D399 - Succes en positieve acties
- Groen Licht: #6EE7B7 - Secundaire groene accenten

**Dark Mode Richtlijnen**
1. Behoud van Schetsmatige Stijl
   - Handgetekende elementen blijven wit of licht gekleurd
   - Gebruik subtiele gradiënten voor diepte
   - Zachte randen en schaduwen voor contrast

2. Contrast en Leesbaarheid
   - Zorg voor WCAG 2.1 AA contrast ratio's
   - Gebruik lichtere tinten voor belangrijke content
   - Vermijd pure zwarte achtergronden

3. Interactieve Elementen
   - Verhoog helderheid bij hover/focus states
   - Behoud consistente feedback patronen
   - Gebruik subtiele glows voor emphasis

4. Overgangen
   - Soepele overgang tussen light/dark mode
   - Behoud van natuurlijke animaties
   - Pas schaduw intensiteit aan voor dark mode

**Typografie**
*Primaire Lettertypen*

1. Space Grotesk
   - Bold (700): App-titel, belangrijke koppen en call-to-actions
   - Medium (500): Sectietitels, navigatie-items
   - Regular (400): Subtitels, knoppen
   Gebruik: Voor alle elementen die aandacht moeten trekken en de visuele hiërarchie moeten leiden.

2. Inter
   - Bold (700): Belangrijke punten in notities, benadrukte UI-elementen
   - Medium (500): Labels, categorieën, subkoppen in notities
   - Regular (400): Notitie-inhoud, standaard UI-tekst, formulieren
   - Light (300): Metadata, secundaire informatie
   Gebruik: Voor alle content en interface elementen waar leesbaarheid en efficiëntie voorop staan.

*Typografische Hiërarchie*

Koppen en Titels (Space Grotesk)
- App-titel: Bold, 28px/1.2
- H1: Bold, 24px/1.2 - Paginatitels
- H2: Medium, 20px/1.3 - Sectietitels
- H3: Medium, 18px/1.4 - Subsectietitels
- H4: Regular, 16px/1.4 - Kleine sectietitels

Content en Interface (Inter)
- Notitie hoofdtekst: Regular, 16px/1.6
- Notitie benadrukte tekst: Medium, 16px/1.6
- Notitie belangrijke punten: Bold, 16px/1.6
- UI-tekst: Regular, 14px/1.5
- Labels: Medium, 12px/1.4
- Metadata: Light, 12px/1.4
- Formulier input: Regular, 14px/1.5

*Lettertype Combinaties en Best Practices*
- Headers + Content: Space Grotesk voor koppen, Inter Regular voor content
- Navigatie: Space Grotesk Medium voor primaire navigatie, Inter Regular voor submenu's
- Knoppen: Space Grotesk Regular voor primaire acties, Inter Medium voor secundaire acties
- Formulieren: Inter Medium voor labels, Inter Regular voor input velden
- Metadata: Inter Light voor timestamps, versie-info en technische details

*Performance Optimalisatie*
- Laad alleen de benodigde font weights
- Gebruik font-display: swap voor optimale laadtijd
- Implementeer lokale font-hosting voor snellere laadtijden
- Gebruik system-ui als fallback voor beide lettertypen

Componenten
Editor Panel
Een centrale component waar gebruikers kunnen schrijven en schetsen.

Witte achtergrond met blauwe onderbroken randen
Horizontale liniëring voor tekstnotities
Ingebouwde microfoonknop voor spraaknotities
Geschikt voor tekst, lijsten en eenvoudige structuren

Navigatie Sidebar
Een verticaal panel met boom-vormige iconen in schetsachtige stijl.

Lichtgrijze achtergrond
Groene, handgetekende boom-iconen voor diverse secties:

Home (dashboard overzicht)
Notities (grid van kaarten)
Taken (Kanban-bord)


Iconen hebben interrupted strokes voor een geschetst uiterlijk

AI Toolbox
Een zijpaneel met AI-assistentie functies.

Donkergroene achtergrond
Witte handgetekende iconen
Functies zoals herschrijven, samenvatten, taken genereren
Verschijnt als een compact paneel dat kan uitklappen

Microfoonknop
Een cirkelvormige knop voor spraakcommando's en dictatie.

Blauwe achtergrond
Wit microfoonicoon in handgetekende stijl
Pulseert tijdens opname
Toont transcriptie na gebruik

Knoppen
Schetsachtige knoppen met handgeschreven labels.

Onderbroken randen
Lichte vulling die de hoofdkleur reflecteert
Subtiele schaduw voor diepte
Lettertype: Handgeschreven (varieert per knoptype)

Tekstvelden en Inputs
Invoervelden met een handgeschreven uiterlijk.

Onderbroken randen
Handgeschreven placeholder tekst
Focus state verandert de rand in een lopende lijn

Checkboxes en Radio Buttons
Selectie-elementen in een schetsmatige stijl.

Handgetekende randen en vinkjes
Licht trillende lijnen voor een handgetekend effect
Geanimeerde selectiestatus

Schetsachtige Stijl Kenmerken
Lijnen en Randen

Onderbroken lijnen: Gebruik van stroke-dasharray in SVG en CSS
Onregelmatige randen: Subtiele afwijkingen van perfect rechte lijnen
Variërende lijndikte: Dunnere en dikkere punten in een lijn

Iconen en Vormen

Handgetekende silhouetten: Natuurlijk uitziende boom- en natuuriconen
Niet-perfecte cirkels: Licht eivormig of met subtiele wobbles
Open lijnen: Waar mogelijk lijnen die niet helemaal aansluiten

Animaties en Interacties

Subtiele beweging: Elementen die licht bewegen of trillen bij hover
Organische transities: Overgangseffecten die natuurlijk en zacht aanvoelen
Handtekening animaties: Effecten die lijken op het tekenen van een lijn

Responsief Gedrag

Desktop: Volledige sidebar met uitgebreide navigatie
Tablet: Ingeklapte sidebar die uitklapt bij hover/tap
Mobiel: Bottom navigation in plaats van sidebar, ingeklapte AI-toolbox als floating button

Toegankelijkheid
Ondanks de schetsachtige esthetiek is het ontwerp toegankelijk met:

Voldoende kleurcontrast voor tekst
Duidelijke focus states
Consistente navigatiepatronen
Alternatieve reguliere lettertypen voor langere tekst waar nodig

