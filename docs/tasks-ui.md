# FlowNote Takenlijst UI Implementatieplan - Vereenvoudigde Versie

## 1. Data Model Vereenvoudiging

### Stap 1.1: Types Vereenvoudigen (types/tasks.ts)

#### Basis Task interface
```typescript
interface Task {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  updatedAt: Date
  userId: string
  deadline?: Date
  position: number
  completionPercentage: number
}
```

#### Notitie Taak (extendeert basis taak)
```typescript
interface NoteTask extends Task {
  sourceNoteId: string
  sourceNoteTitle: string
  extractedText: string
}
```

#### Groep Taak (extendeert basis taak)
```typescript
interface GroupTask extends Task {
  groupId: string
}
```

#### Groep
```typescript
interface Group {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  color?: string
}
```

### Stap 1.2: Firebase Schema Vereenvoudigen
- Bestaande tasks collectie behouden
- Nieuwe taskGroups collectie toevoegen
- Validatieregels aanpassen voor nieuwe structuur

## 2. State Management Vereenvoudiging

### Stap 2.1: TaskContext Vereenvoudigen (context/TaskContext.tsx)
- Basis CRUD operaties voor taken
- Basis CRUD operaties voor groepen
- Vereenvoudigde filter functies
- Basis statistiekberekeningen
- UI-state voor uitklappen/inklappen

### Stap 2.2: Service Layer Vereenvoudigen (lib/taskGroups.ts)
- Basis Firestore interacties
- Hergebruik bestaande patterns

## 3. UI Componenten Vereenvoudiging

### Stap 3.1: Basis Components Behouden
- TaskList.tsx (bestaat al)
- TaskGroupCard.tsx (bestaat al)
- CircularProgress.tsx (bestaat al)

### Stap 3.2: TasksPage Vereenvoudigen
- Update /app/tasks/page.tsx
- Behouden van bestaande layout
- Vereenvoudigde filters
- Duidelijke scheiding tussen notitie-taken en groep-taken

## 4. Integratie Vereenvoudiging

### Stap 4.1: Notitie-Taak Koppeling Vereenvoudigen
- Behouden van bestaande markering functionaliteit
- Vereenvoudigde bronreferenties

### Stap 4.2: Navigatie Vereenvoudigen
- Bestaande sidebar links behouden
- Basis navigatie tussen notities en taken

## 5. Styling Vereenvoudiging

### Stap 5.1: Bestaande Styling Behouden
- Hergebruik bestaande Tailwind classes
- Behouden van dark mode support
- Consistente kleurcodering

### Stap 5.2: Responsiveness Vereenvoudigen
- Behouden van bestaande breakpoints
- Minimale aanpassingen voor nieuwe componenten

## 6. Performance & Toegankelijkheid

### Stap 6.1: Basis Optimalisaties
- Behouden van bestaande memoization
- Basis virtualisatie waar nodig

### Stap 6.2: Toegankelijkheid Behouden
- Bestaande ARIA attributen behouden
- Consistente toetsenbordnavigatie

## Technische Vereisten Vereenvoudigen
- TypeScript types voor nieuwe componenten
- Hergebruik bestaande React patterns
- Minimale afwijking van bestaande codebase
- Consistente error handling
- Behouden van dark mode support

## Nieuwe Fasering

### Fase 1: Data Model Vereenvoudiging (Week 1)
- Types vereenvoudigen
- Firebase schema aanpassen
- Basis tests schrijven

### Fase 2: State Management Vereenvoudiging (Week 1-2)
- TaskContext vereenvoudigen
- Service layer aanpassen
- Unit tests uitbreiden

### Fase 3: UI Vereenvoudiging (Week 2-3)
- Bestaande componenten aanpassen
- Nieuwe componenten toevoegen
- Integratietests schrijven

### Fase 4: Integratie & Polish (Week 3-4)
- Notitie-taak koppeling vereenvoudigen
- Navigatie aanpassen
- Performance optimalisaties
- Bug fixes

## Voordelen van deze Vereenvoudiging
- Duidelijkere scheiding tussen notitie-taken en groep-taken
- Geen complexe relatiestructuren
- Makkelijk te begrijpen en te onderhouden
- Betere type-safety
- Eenvoudigere queries
- Betere performance
- Makkelijker onderhoud
- Duidelijkere code
- Betere gebruikerservaring

## Afwegingen
- Verlies van mogelijkheid om een taak zowel uit notitie als in groep te hebben
- Verlies van complexe metadata over relaties
- Winst in eenvoud en onderhoudbaarheid
- Winst in performance en gebruikerservaring