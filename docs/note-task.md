# Functionaliteiten en Werking: Notitie-naar-Taak Systeem

## 1. Kernfunctionaliteiten

### 1.1 Tekstselectie en Markering
Het systeem stelt gebruikers in staat om tekst binnen hun notities te selecteren en te markeren als potentiële taken. De functionaliteit werkt als volgt:

- **Selectie**: Gebruikers kunnen tekst selecteren door er met de muis overheen te slepen of door toetsenbordcommando's te gebruiken
- **Contextmenu**: Bij selectie verschijnt een contextmenu met de optie "Markeer als taak"
- **Markering**: Geselecteerde tekst wordt visueel gemarkeerd (bijvoorbeeld met een gele achtergrond en een taak-icoon)
- **Meervoudige selecties**: Meerdere tekstdelen binnen dezelfde notitie kunnen gemarkeerd worden als afzonderlijke taken

### 1.2 Taakextractie
Gemarkeerde tekst kan vervolgens worden omgezet naar echte taken in het takensysteem:

- **Extractieproces**: Via een "Extraheer Taken" knop kunnen alle gemarkeerde tekstdelen tegelijk worden omgezet naar taken
- **Metagegevens**: Bij extractie worden automatisch metagegevens toegevoegd:
  - Bron-notitie (titel en ID)
  - Datum van extractie
  - Standaardstatus ("Te doen")

### 1.3 Kanban Takenbord
De geëxtraheerde taken worden weergegeven op een visueel Kanban-bord:

- **Kolomindeling**: Taken worden ingedeeld in kolommen op basis van status (Te doen, In uitvoering, Voltooid)
- **Drag-and-drop**: Gebruikers kunnen taken tussen kolommen slepen om de status te wijzigen
- **Taakkaarten**: Elke taak wordt weergegeven als een kaart met:
  - Taaktitel (de geëxtraheerde tekst)
  - Bron-notitie (met link)
  - Datum van aanmaak
  - Prioriteit (indien ingesteld)
  - Deadline (indien ingesteld)

### 1.4 Traceerbaarheid
Het systeem houdt de relatie tussen notities en taken bij:

- **Bidirectionele tagging**: Zowel taken als notities worden getagd om hun onderlinge relatie te tonen
- **Navigatielinks**: Vanuit een taak kan direct naar de bronnotitie worden genavigeerd
- **Statusindicatie**: De notitie toont welke delen zijn geëxtraheerd als taken
- **Integriteitsmanagement**: Bij verwijdering van een notitie of taak worden de bijbehorende referenties netjes afgehandeld

## 2. Gebruikersworkflow

### 2.1 Notitie maken en bewerken
1. Gebruiker maakt of opent een bestaande notitie in FlowNote
2. Gebruiker schrijft of bewerkt inhoud zoals normaal
3. TipTap editor biedt alle gebruikelijke opmaakfunctionaliteiten

### 2.2 Taken identificeren
1. Gebruiker identificeert delen van de tekst die actiepunten of taken vertegenwoordigen
2. Gebruiker selecteert relevant tekstdeel
3. Contextmenu verschijnt, gebruiker kiest "Markeer als taak"
4. Tekst wordt visueel gemarkeerd en intern geregistreerd als potentiële taak
5. Gebruiker herhaalt proces voor alle gewenste taken in de notitie

### 2.3 Taken extraheren
1. Na het markeren van alle gewenste taken, klikt gebruiker op "Extraheer taken" knop
2. Systeem toont een preview van de te maken taken
3. Gebruiker kan per taak aanvullende details toevoegen:
   - Prioriteit instellen (laag, medium, hoog)
   - Deadline toevoegen
   - Initiële status selecteren
4. Gebruiker bevestigt de extractie
5. Systeem creëert nieuwe taakitems in de database
6. Bevestigingsmelding toont het aantal succesvol aangemaakte taken

### 2.4 Takenbeheer
1. Gebruiker navigeert naar het Takenbord
2. Systeem toont alle taken ingedeeld in statuskolommen
3. Gebruiker kan:
   - Taken slepen tussen kolommen om status te wijzigen
   - Op een taak klikken voor details of bewerking
   - Taken filteren op bron, prioriteit of deadline
   - Direct naar bronnotitie navigeren via link op de taakkaart

## 3. Technische Werking

### 3.1 Tekstselectie met TipTap
TipTap, gebouwd op ProseMirror, wordt gebruikt voor de tekstselectie en markering:

- **Selectiedetectie**: TipTap's selectie-API detecteert gebruikersselecties
- **Command systeem**: Voor het toepassen van markeringen op geselecteerde tekst
- **Aangepaste Extension**: Een op maat gemaakte TipTap-extensie voegt de functionaliteit voor taakmarkering toe
- **BubbleMenu**: Verschijnt bij tekstselectie voor contextgebonden acties
- **Persistentie**: Markeringen worden opgeslagen als onderdeel van de document-structuur

### 3.2 Drag-and-Drop met React Beautiful DnD
Het Kanban-bord gebruikt React Beautiful DnD voor vloeiende drag-and-drop functionaliteit:

- **DragDropContext**: Omsluit het hele Kanban-bord
- **Droppable zones**: Elke statuskolom is een droppable zone
- **Draggable items**: Elke taakkaart is een draggable item
- **Statusupdates**: Wanneer een taak naar een andere kolom wordt gesleept, wordt de status automatisch bijgewerkt in de database

### 3.3 Database-integratie
Firestore wordt gebruikt voor het opslaan van zowel notities als taken:

- **Notities collectie**: Bevat de volledige notitie-inhoud inclusief markeringen
- **Taken collectie**: Bevat alle geëxtraheerde taken met referentie naar bron-notities
- **Real-time updates**: Wijzigingen in taakstatus worden real-time bijgewerkt

### 3.4 Cross-referentie Mechanisme
Het systeem gebruikt een geavanceerd tagging-systeem om de relaties te beheren:

- **Unieke identifiers**: Elke geëxtraheerde taak krijgt een unieke ID
- **Referentievelden**: Zowel notities als taken bevatten referentievelden naar elkaar
- **Cascade updates**: Wijzigingen worden voortgeplant waar nodig

## 4. Gebruikersinterface en Experience

### 4.1 Visuele Representatie
- **Taakmarkeringen**: Gemarkeerd met subtiele maar duidelijke visuele stijl (gele achtergrond met taak-icoon)
- **Kanban-bord**: Duidelijke visuele scheiding tussen kolommen
- **Taakkaarten**: Compacte maar informatieve kaarten met duidelijke status-indicator
- **Contextmenu's**: Minimalistisch ontwerp dat niet afleidt van de content

### 4.2 Toegankelijkheid
- **Toetsenbordnavigatie**: Volledig bruikbaar zonder muis
- **Screenreader ondersteuning**: ARIA-labels en -beschrijvingen voor alle componenten
- **Kleurcontrast**: Voldoet aan WCAG 2.1 richtlijnen
- **Foutmeldingen**: Duidelijke en helpende foutmeldingen

### 4.3 Responsiviteit
- **Mobiele weergave**: Aangepaste layout voor kleinere schermen
- **Touch-interactie**: Ondersteuning voor touch-gestures voor drag-and-drop
- **Performance optimalisatie**: Efficiënte rendering voor verschillende apparaten

## 5. Edge Cases en Foutafhandeling

### 5.1 Notitiebewerking na Extractie
- Geëxtraheerde taken blijven onafhankelijk van de bronnotitie
- Bewerking van de bronnotitie heeft geen invloed op de inhoud van bestaande taken
- Markeringen blijven zichtbaar na extractie, maar worden visueel anders weergegeven (grijze achtergrond)

### 5.2 Verwijdering en Integriteit
- **Notitie verwijderen**: Bij verwijdering van een bronnotitie:
  - Geëxtraheerde taken blijven bestaan
  - Referentie naar bronnotitie wordt verwijderd of gemarkeerd als "Verwijderde notitie"
- **Taak verwijderen**: Bij verwijdering van een taak:
  - Markering in bronnotitie wordt niet automatisch verwijderd
  - Referentie wordt bijgewerkt om aan te geven dat de taak is verwijderd

### 5.3 Foutafhandeling
- **Netwerkfouten**: Offline-first benadering, veranderingen worden lokaal opgeslagen en gesynchroniseerd wanneer verbinding beschikbaar is
- **Incomplete acties**: Mechanisme om onderbroken taakextractie te herstellen
- **Conflicterende bewerkingen**: Strategie voor het oplossen van conflicten bij gelijktijdige bewerking