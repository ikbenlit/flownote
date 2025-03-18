export interface TaskMarking {
  id: string
  text: string
  completed: boolean
  startIndex: number
  endIndex: number
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  taskMarkings: TaskMarking[]
  createdAt: Date
  updatedAt: Date
  userId: string
  extractedTaskIds: string[]
}

export interface NoteInput {
  title: string
  content: string
  tags: string[]
  taskMarkings: TaskMarking[]
}

export interface NoteContextType {
  notes: Note[]
  addNote: (note: NoteInput) => Promise<string>
  updateNote: (id: string, note: Partial<NoteInput>) => Promise<void>
  deleteNote: (id: string) => Promise<void>
  getNote: (id: string) => Note | undefined
  loading: boolean
  error: Error | null
} 