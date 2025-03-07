'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'

interface Task {
  id?: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  sourceNoteId?: string
  sourceNoteTitle?: string
  extractedText?: string
  position: number
  userId: string
}

interface TaskContextType {
  addTask: (task: Omit<Task, 'id'>) => Promise<string>
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
  const addTask = useCallback(async (task: Omit<Task, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task)
      return docRef.id
    } catch (error) {
      console.error('Fout bij het toevoegen van taak:', error)
      throw error
    }
  }, [])

  const value = {
    addTask
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
} 