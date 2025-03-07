'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { Note, NoteInput } from '../types/notes'
import * as NotesService from '../lib/notes'

type NoteContextType = {
  notes: Note[]
  loading: boolean
  error: Error | null
  addNote: (note: NoteInput) => Promise<void>
  updateNote: (id: string, note: Partial<NoteInput>) => Promise<void>
  deleteNote: (id: string) => Promise<void>
  getNote: (id: string) => Note | undefined
  searchNotes: (query: string) => Note[]
  refreshNotes: () => Promise<void>
}

const NoteContext = createContext<NoteContextType | undefined>(undefined)

export function NoteProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Notities ophalen wanneer de gebruiker verandert
  useEffect(() => {
    if (currentUser) {
      refreshNotes()
    } else {
      setNotes([])
    }
  }, [currentUser])

  const refreshNotes = async () => {
    if (!currentUser) return
    
    setLoading(true)
    setError(null)
    
    try {
      const fetchedNotes = await NotesService.getUserNotes(currentUser.uid)
      setNotes(fetchedNotes)
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError(err instanceof Error ? err : new Error('Er is een fout opgetreden bij het ophalen van notities.'))
    } finally {
      setLoading(false)
    }
  }

  const addNote = async (noteInput: NoteInput) => {
    if (!currentUser) throw new Error('Je moet ingelogd zijn om notities toe te voegen.')
    
    setLoading(true)
    setError(null)
    
    try {
      const noteId = await NotesService.createNote(currentUser.uid, noteInput)
      await refreshNotes()
    } catch (err) {
      console.error('Error adding note:', err)
      setError(err instanceof Error ? err : new Error('Er is een fout opgetreden bij het toevoegen van de notitie.'))
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateNote = async (id: string, noteInput: Partial<NoteInput>) => {
    if (!currentUser) throw new Error('Je moet ingelogd zijn om notities bij te werken.')
    
    setLoading(true)
    setError(null)
    
    try {
      await NotesService.updateNote(id, noteInput)
      await refreshNotes() // Notities opnieuw ophalen om de wijzigingen te tonen
    } catch (err) {
      console.error('Error updating note:', err)
      setError(err instanceof Error ? err : new Error('Er is een fout opgetreden bij het bijwerken van de notitie.'))
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (id: string) => {
    if (!currentUser) throw new Error('Je moet ingelogd zijn om notities te verwijderen.')
    
    setLoading(true)
    setError(null)
    
    try {
      await NotesService.deleteNote(id)
      setNotes(prev => prev.filter(note => note.id !== id))
    } catch (err) {
      console.error('Error deleting note:', err)
      setError(err instanceof Error ? err : new Error('Er is een fout opgetreden bij het verwijderen van de notitie.'))
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getNote = (id: string) => {
    return notes.find(note => note.id === id)
  }

  const searchNotes = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ')
    return notes.filter(note => {
      const content = note.content.toLowerCase()
      const title = note.title.toLowerCase()
      const tags = note.tags?.map(tag => tag.toLowerCase()) || []
      
      return searchTerms.every(term => 
        content.includes(term) || 
        title.includes(term) || 
        tags.some(tag => tag.includes(term))
      )
    })
  }

  return (
    <NoteContext.Provider 
      value={{ 
        notes, 
        loading, 
        error, 
        addNote, 
        updateNote,
        deleteNote, 
        getNote,
        searchNotes,
        refreshNotes
      }}
    >
      {children}
    </NoteContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NoteContext)
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider')
  }
  return context
} 