'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { 
  addDoc, 
  collection, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  FirestoreError
} from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import { TaskMarking } from '@/types/notes'
import { Task, TaskGroup, TaskStats, TaskFilterCriteria } from '@/types/tasks'

interface TaskContextType {
  tasks: Task[]
  taskGroups: TaskGroup[]
  loading: boolean
  error: string | null
  debugInfo: {
    lastError?: {
      code: string;
      message: string;
      details?: any;
    };
    authState?: {
      isAuthenticated: boolean;
      userId?: string;
    };
    queryState?: {
      isActive: boolean;
      lastUpdate?: Date;
    };
  }
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>) => Promise<boolean>
  deleteTask: (id: string) => Promise<boolean>
  getTasksByNoteId: (noteId: string) => Task[]
  extractTasksFromNote: (noteId: string, noteTitle: string, markings: TaskMarking[]) => Promise<string[]>
  addTaskGroup: (group: Omit<TaskGroup, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>
  updateTaskGroup: (id: string, updates: Partial<Omit<TaskGroup, 'id' | 'createdAt' | 'userId'>>) => Promise<boolean>
  deleteTaskGroup: (id: string) => Promise<boolean>
  getTasksByGroupId: (groupId: string) => Task[]
  getGroupStats: (groupId: string) => TaskStats
  filterTasks: (criteria: TaskFilterCriteria) => Task[]
}

const TaskContext = createContext<TaskContextType | null>(null)

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask moet binnen een TaskProvider worden gebruikt')
  }
  return context
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<{
    lastError?: {
      code: string;
      message: string;
      details?: any;
    };
    authState?: {
      isAuthenticated: boolean;
      userId?: string;
    };
    queryState?: {
      isActive: boolean;
      lastUpdate?: Date;
    };
  }>({})

  // Debug logging functie
  const logDebug = useCallback((message: string, data?: any) => {
    console.log(`[TaskContext Debug] ${message}`, data || '')
    setDebugInfo(prev => ({
      ...prev,
      lastError: data?.error ? {
        code: data.error.code || 'unknown',
        message: data.error.message || 'unknown error',
        details: data.error
      } : prev.lastError
    }))
  }, [])

  // Firestore listeners voor taken en taakgroepen
  useEffect(() => {
    const user = auth.currentUser
    if (!user) {
      logDebug('Geen gebruiker ingelogd, geen listeners opgezet')
      return
    }

    const userId = user.uid
    logDebug('Firestore listeners opzetten', { 
      userId,
      auth: user,
      isAuthenticated: !!user
    })

    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    )

    const groupsQuery = query(
      collection(db, 'taskGroups'),
      where('userId', '==', userId)
    )

    logDebug('Queries opgezet', {
      tasksQuery: tasksQuery,
      groupsQuery: groupsQuery,
      userId
    })

    const unsubscribeTasks = onSnapshot(tasksQuery, 
      (snapshot) => {
        logDebug('Taken update ontvangen', {
          count: snapshot.docs.length,
          docs: snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        })
        setTasks(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Task)))
        setLoading(false)
      },
      (error) => {
        logDebug('Fout bij taken listener', {
          error: error.message,
          code: error.code,
          userId,
          auth: auth.currentUser
        })
        setError(error.message)
        setLoading(false)
      }
    )

    const unsubscribeGroups = onSnapshot(groupsQuery,
      (snapshot) => {
        logDebug('Taakgroepen update ontvangen', {
          count: snapshot.docs.length,
          docs: snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        })
        setTaskGroups(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as TaskGroup)))
        setLoading(false)
      },
      (error) => {
        logDebug('Fout bij taakgroepen listener', {
          error: error.message,
          code: error.code,
          userId,
          auth: auth.currentUser
        })
        setError(error.message)
        setLoading(false)
      }
    )

    return () => {
      unsubscribeTasks()
      unsubscribeGroups()
    }
  }, [logDebug])

  // Bestaande CRUD operaties voor taken
  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const now = Timestamp.now()
      const newTask = {
        ...task,
        createdAt: now,
        updatedAt: now,
      }

      const docRef = await addDoc(collection(db, 'tasks'), newTask)
      return docRef.id
    } catch (error) {
      console.error('Fout bij het toevoegen van taak:', error)
      throw error
    }
  }, [])

  const updateTask = useCallback(async (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>): Promise<boolean> => {
    try {
      const taskRef = doc(db, 'tasks', id)
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      })
      return true
    } catch (error) {
      console.error('Fout bij het updaten van taak:', error)
      return false
    }
  }, [])

  const deleteTask = useCallback(async (id: string): Promise<boolean> => {
    try {
      const taskRef = doc(db, 'tasks', id)
      await deleteDoc(taskRef)
      return true
    } catch (error) {
      console.error('Fout bij het verwijderen van taak:', error)
      return false
    }
  }, [])

  // Nieuwe CRUD operaties voor taakgroepen
  const addTaskGroup = useCallback(async (group: Omit<TaskGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error('Gebruiker moet ingelogd zijn')
      }

      const now = Timestamp.now()
      const newGroup = {
        ...group,
        userId: user.uid,
        createdAt: now,
        updatedAt: now,
      }

      logDebug('Adding new task group', { 
        group: newGroup,
        userId: user.uid,
        auth: auth.currentUser
      })

      const docRef = await addDoc(collection(db, 'taskGroups'), newGroup)
      return docRef.id
    } catch (error) {
      console.error('Fout bij het toevoegen van taakgroep:', error)
      throw error
    }
  }, [logDebug])

  const updateTaskGroup = useCallback(async (id: string, updates: Partial<Omit<TaskGroup, 'id' | 'createdAt' | 'userId'>>): Promise<boolean> => {
    try {
      const groupRef = doc(db, 'taskGroups', id)
      await updateDoc(groupRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      })
      return true
    } catch (error) {
      console.error('Fout bij het updaten van taakgroep:', error)
      return false
    }
  }, [])

  const deleteTaskGroup = useCallback(async (id: string): Promise<boolean> => {
    try {
      const groupRef = doc(db, 'taskGroups', id)
      await deleteDoc(groupRef)
      return true
    } catch (error) {
      console.error('Fout bij het verwijderen van taakgroep:', error)
      return false
    }
  }, [])

  // Helper functies
  const getTasksByNoteId = useCallback((noteId: string): Task[] => {
    return tasks.filter(task => task.sourceNoteId === noteId)
  }, [tasks])

  const getTasksByGroupId = useCallback((groupId: string): Task[] => {
    // Vind eerst de groep om te bepalen of het een notitie-groep is
    const group = taskGroups.find(g => g.id === groupId);
    
    if (group?.sourceNoteId) {
      // Als het een notitie-groep is, toon alleen taken van die notitie
      return tasks.filter(task => task.sourceNoteId === group.sourceNoteId);
    } else {
      // Als het een normale groep is, toon alleen taken die expliciet aan deze groep zijn toegewezen
      return tasks.filter(task => task.groupId === groupId);
    }
  }, [tasks, taskGroups])

  const getGroupStats = useCallback((groupId: string): TaskStats => {
    const groupTasks = getTasksByGroupId(groupId)
    const total = groupTasks.length
    const completed = groupTasks.filter(task => task.status === 'done').length
    const inProgress = groupTasks.filter(task => task.status === 'in_progress').length
    const todo = groupTasks.filter(task => task.status === 'todo').length
    const completionPercentage = total > 0 ? (completed / total) * 100 : 0

    return {
      total,
      completed,
      inProgress,
      todo,
      completionPercentage
    }
  }, [getTasksByGroupId])

  const filterTasks = useCallback((criteria: TaskFilterCriteria): Task[] => {
    return tasks.filter(task => {
      // Basis filters
      if (criteria.status && task.status !== criteria.status) return false;
      if (criteria.priority && task.priority !== criteria.priority) return false;
      if (criteria.search && !task.title.toLowerCase().includes(criteria.search.toLowerCase())) return false;
      
      // Datum filters
      if (criteria.dueDate) {
        if (criteria.dueDate.start && task.deadline && task.deadline < criteria.dueDate.start) return false;
        if (criteria.dueDate.end && task.deadline && task.deadline > criteria.dueDate.end) return false;
      }

      // Groep en notitie filters
      if (criteria.groupId === undefined) {
        // Voor de "ungrouped" sectie: toon alleen taken die geen groupId EN geen sourceNoteId hebben
        return !task.groupId && !task.sourceNoteId;
      } else {
        // Voor een specifieke groep
        const group = taskGroups.find(g => g.id === criteria.groupId);
        if (!group) return false;

        if (group.sourceNoteId) {
          // Voor notitie-groepen: toon alleen taken van die specifieke notitie
          return task.sourceNoteId === group.sourceNoteId;
        } else {
          // Voor handmatige groepen: toon alleen taken die expliciet aan deze groep zijn toegewezen
          return task.groupId === criteria.groupId;
        }
      }
    });
  }, [tasks, taskGroups]);

  const extractTasksFromNote = useCallback(async (
    noteId: string, 
    noteTitle: string, 
    markings: TaskMarking[]
  ): Promise<string[]> => {
    try {
      const taskIds: string[] = []
      const user = auth.currentUser
      
      if (!user) {
        throw new Error('Gebruiker moet ingelogd zijn')
      }

      // Zoek bestaande groep voor deze notitie of maak een nieuwe aan
      let groupId = taskGroups.find(group => group.sourceNoteId === noteId)?.id

      if (!groupId) {
        // Maak een nieuwe groep voor deze notitie
        groupId = await addTaskGroup({
          name: noteTitle,
          description: `Taken uit notitie: ${noteTitle}`,
          userId: user.uid,
          sourceNoteId: noteId,
          color: '#3B82F6' // Default blauw, kan later aangepast worden
        })
      }
      
      // Batch toevoegen van taken
      for (const marking of markings) {
        const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
          title: marking.markedText,
          sourceNoteId: noteId,
          sourceNoteTitle: noteTitle,
          extractedText: marking.markedText,
          status: 'todo',
          priority: 'medium',
          position: tasks.length,
          userId: user.uid,
          completionPercentage: 0,
          groupId: groupId // Koppel de taak aan de groep
        }
        
        const taskId = await addTask(newTask)
        taskIds.push(taskId)
      }
      
      return taskIds
    } catch (err) {
      console.error('Fout bij extracteren van taken:', err)
      setError('Taken konden niet worden aangemaakt. Probeer het opnieuw.')
      return []
    }
  }, [addTask, tasks.length, taskGroups, addTaskGroup])

  const value = {
    tasks,
    taskGroups,
    loading,
    error,
    debugInfo,
    addTask,
    updateTask,
    deleteTask,
    getTasksByNoteId,
    extractTasksFromNote,
    addTaskGroup,
    updateTaskGroup,
    deleteTaskGroup,
    getTasksByGroupId,
    getGroupStats,
    filterTasks,
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
} 