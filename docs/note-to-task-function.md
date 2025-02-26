# Notitie-naar-Taak Functionaliteit
### Basic userflown: Gebruikersflow
- Gebruiker schrijft of opent een notitie
- Selecteert relevante tekst en gebruikt contextmenu om als taak te markeren
- Herhaalt voor alle gewenste taken in de notitie
- Kiest "Exporteer naar takenbord" om alle gemarkeerde taken te extraheren
- Taken verschijnen op het takenbord met verwijzing naar de bron-notitie
- Gebruiker kan taken organiseren en bijwerken in de Kanban-weergave

## 1. Tekstselectie in TipTap Editor

- Er moet ondersteuning zijn voor meerdere, niet-aaneengesloten tekstselecties
- Per selectie verschijnt een contextmenu met exact één optie: "Markeer als taak"
- Bij klikken op deze optie wordt de geselecteerde tekst visueel gemarkeerd (highlight kleur: `#FFEB3B`)
- Elke tekst die is gemarkeerd als taak wordt intern opgeslagen in een array van objecten met structuur:

```javascript
{
  text: "geselecteerde tekst",
  selectionRanges: [{ from: 0, to: 10 }, ...], // posities in de editor
  markedAt: timestamp
}
```

## 2. Taakextractie Interface

Op de notitie-pagina moet een knop "Taken extraheren" zichtbaar zijn zodra er minstens één tekst is gemarkeerd als taak. Bij klikken verschijnt een modal met:

- Lijst van alle gemarkeerde teksten
- Dropdown voor selectie takenbord (bestaand of nieuw aanmaken)
- Knop "Extraheren" en "Annuleren"

## 3. Datastructuur

### Notitie entiteit krijgt extra veld:
```javascript
{
  markedTasks: [{ text, selectionRanges, markedAt }],
  exportedTaskBoards: [{ boardId, boardName, exportedAt }]
}
```

### Taak entiteit heeft minimaal:
```javascript
{
  id: string,
  title: string, // overgenomen van gemarkeerde tekst
  sourceNoteId: string, // id van bron-notitie
  sourceNoteName: string, // titel van bron-notitie
  status: "todo" | "in-progress" | "completed",
  boardId: string,
  createdAt: timestamp
}
```

### Takenbord entiteit heeft:
```javascript
{
  id: string,
  name: string,
  columns: ["todo", "in-progress", "completed"],
  sourceNoteIds: string[], // IDs van notities waaruit taken zijn geëxtraheerd
  createdAt: timestamp
}
```

## 4. Relatie Management

### Bij verwijdering van een notitie:
- Alle taken behouden hun informatie maar het veld `sourceNoteName` wordt gewijzigd naar "Verwijderde notitie"
- Er wordt geen cascade-delete uitgevoerd

### Bij verwijdering van een taak:
- De referentie naar deze taak wordt verwijderd uit de `markedTasks` array van de bronnotitie
- Als er geen taken meer op een takenbord staan die afkomstig zijn van een bepaalde notitie, wordt de bijbehorende `exportedTaskBoards` entry verwijderd

### Bij verwijdering van een takenbord:
- Alle taken op dat bord worden verwijderd
- Alle referenties naar dit bord worden verwijderd uit de `exportedTaskBoards` arrays van notities

## 5. Exacte TipTap Configuratie

### Verplichte extensies:
- StarterKit
- Highlight (met `multicolor: true`)
- TaskList + TaskItem
- Heading (niveaus 1, 2, 3)
- Image (ondersteuning voor URL's en upload)

### Toolbar moet bevatten:
- Tekststijlen (bold, italic, underline)
- Headings (H1, H2, H3)
- Lijsten (bullet, numbered, task)
- Highlight functie
- Afbeelding toevoegen

## 6. Kanban Interactie

- Taken kunnen alleen gesleept worden tussen de drie vaste kolommen
- Er zijn geen sub-taken mogelijk in het MVP
- Taken kunnen niet gesplitst of samengevoegd worden
- Bij slepen van een taak naar een andere kolom wordt de status onmiddellijk geüpdatet

## 7. Limitaties

- Er is GEEN synchronisatie van wijzigingen tussen taken en de originele notitie
- Taken die als checkbox in de notitie voorkomen worden NIET automatisch herkend als taken
- Er is geen automatische deadline-detectie in de tekst