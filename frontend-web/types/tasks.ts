export interface Task {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  sourceNoteId: string
  sourceNoteTitle: string
  extractedText: string
  createdAt: Date
  updatedAt: Date
  userId: string
  deadline?: Date
  position: number
  groupId?: string
  completionPercentage: number
}

export interface TaskGroup {
  id: string
  name: string
  description?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  color?: string
  sourceNoteId?: string
}

export interface TaskStats {
  total: number
  completed: number
  inProgress: number
  todo: number
  completionPercentage: number
}

export interface TaskFilterCriteria {
  status?: Task['status']
  priority?: Task['priority']
  noteId?: string
  groupId?: string
  search?: string
  dueDate?: {
    start?: Date
    end?: Date
  }
} 