# Vereenvoudigd Implementatieplan: Taken bij Opslaan (v2)

Dit vereenvoudigde implementatieplan richt zich op het wijzigen van het gedrag van tekstmarkeringen in FlowNote. In plaats van direct taken aanmaken bij het klikken op een markering, zullen taken worden aangemaakt bij het opslaan van de notitie, waarna de markeringen worden verwijderd.

## 1. Datamodel ✅

### 1.1 Task Interface ✅
```typescript
interface Task {
  id: string;                     // Unieke identifier
  title: string;                  // Taakomschrijving
  sourceNoteId: string;           // Referentie naar bronnotitie
  sourceNoteTitle: string;        // Titel van bronnotitie voor weergave
  extractedText: string;          // De originele gemarkeerde tekst
  status: 'todo' | 'in_progress' | 'done';  // Taakstatus (bestaande waardes behouden)
  priority: 'low' | 'medium' | 'high';      // Taakprioriteit
  createdAt: Date;                // Aanmaakdatum
  updatedAt: Date;                // Laatste update
  userId: string;                 // Gebruiker-ID
  deadline?: Date;                // Optionele deadline (bestaande feature behouden)
  position: number;               // Voor drag-and-drop volgorde
}
```

### 1.2 TaskMarking Interface ✅
```typescript
interface TaskMarking {
  id: string;                     // Unieke identifier
  markedText: string;             // Gemarkeerde tekst
  startOffset: number;            // Beginpositie in de editor
  endOffset: number;              // Eindpositie in de editor
  createdAt: Date;                // Wanneer gemarkeerd
  extractedTaskId?: string;       // ID van de taak als deze is geëxtraheerd
}
```

## 2. Implementatiefases

### Fase 1: Basis TaskContext ✅ (1 dag)
- Uitbreiden van bestaande TaskContext met:
  ```typescript
  interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<string>;
    updateTask: (id: string, updates: Partial<Task>) => Promise<boolean>;
    deleteTask: (id: string) => Promise<boolean>;
    getTasksByNoteId: (noteId: string) => Task[];
    extractTasksFromNote: (noteId: string, noteTitle: string, markings: TaskMarking[]) => Promise<string[]>;
  }
  ```
- Implementeren van Firestore listeners voor real-time updates
- Basis error handling en loading states

### Fase 2: Taak Extractie ✅ (1 dag)
- Implementeren van `extractTaskMarkings` in NoteEditor
- Aanpassen van `handleSubmit` voor taakextractie
- Toevoegen van gebruikersfeedback bij extractie
- Testen van de volledige extractie workflow

### Fase 3: TaskList Component ✅
- TaskList component met filtering en status updates ✅
- TaskPage met filtering mogelijkheden ✅

### Fase 4: UI/UX Verfijning ✅
- Toevoegen van CSS styling ✅
- Implementeren van basis animaties ✅
- Toevoegen van loading states ✅
- Verbeteren van error handling ✅

## 3. Vereenvoudigde UI Componenten

### 3.1 TaskList
```typescript
interface TaskListProps {
  filter?: {
    status?: Task['status'];
    priority?: Task['priority'];
    noteId?: string;
  }
}
```

### 3.2 Basis Styling
```css
.task-list {
  @apply space-y-2;
}

.task-item {
  @apply p-4 bg-white rounded-lg shadow;
}

.task-status {
  @apply px-2 py-1 rounded text-sm;
}

.status-todo { @apply bg-yellow-100 text-yellow-800; }
.status-in-progress { @apply bg-blue-100 text-blue-800; }
.status-done { @apply bg-green-100 text-green-800; }
```

## 4. Routes en Navigatie

### 4.1 Nieuwe Routes
```typescript
// App.tsx
<Route path="/tasks" element={<TaskPage />} />
```

### 4.2 Sidebar Item
```typescript
{
  path: '/tasks',
  icon: <FaCheckSquare />,
  label: t('nav.tasks'),
}
```

## 5. Minimale Vertalingen

```typescript
export const translations = {
  'tasks.title': {
    nl: 'Mijn Taken',
    en: 'My Tasks',
  },
  'tasks.status.todo': {
    nl: 'Te doen',
    en: 'To do',
  },
  'tasks.status.in_progress': {
    nl: 'Mee bezig',
    en: 'In progress',
  },
  'tasks.status.done': {
    nl: 'Afgerond',
    en: 'Done',
  },
  'tasks.priority.low': {
    nl: 'Laag',
    en: 'Low',
  },
  'tasks.priority.medium': {
    nl: 'Gemiddeld',
    en: 'Medium',
  },
  'tasks.priority.high': {
    nl: 'Hoog',
    en: 'High',
  }
}
```

## 6. Aandachtspunten

### 6.1 Technische Aandachtspunten
- Behoud bestaande status waardes (`todo`, `in_progress`, `done`)
- Hergebruik bestaande TaskMarking interface
- Implementeer eerst basis CRUD operaties
- Voeg real-time updates toe met Firestore listeners

### 6.2 UX Aandachtspunten
- Duidelijke feedback bij taakextractie
- Eenvoudige status updates
- Basis filtering mogelijkheden
- Loading states voor betere gebruikerservaring

## 7. Tijdlijn

- **Fase 1**: 1 dag - TaskContext uitbreiden
- **Fase 2**: 1 dag - Taak extractie implementeren
- **Fase 3**: 1 dag - TaskList component
- **Fase 4**: 0.5 dag - UI/UX verfijning

Totale geschatte tijd: 3.5 dagen

## 8. Wat is Weggelaten (Voor Later)

1. **Kanban View**
   - Complexere drag-and-drop functionaliteit
   - Kolom-gebaseerde weergave
   - Position tracking

2. **Geavanceerde Filtering**
   - Meerdere filter criteria
   - Zoekfunctionaliteit
   - Sortering

3. **Taak Details**
   - Uitgebreide taak informatie
   - Subtaken
   - Labels/tags

4. **Notificaties**
   - Deadline herinneringen
   - Status wijzigingen
   - Taak toewijzingen

Dit vereenvoudigde plan focust op de kernfunctionaliteit die nodig is voor een werkende MVP, met ruimte voor toekomstige uitbreidingen. 