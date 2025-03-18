'use client'

import React, { useState, useMemo } from 'react'
import { useNotes } from '@/context/NoteContext'
import { NotesGrid } from './NotesGrid'
import { NotesSearch } from './NotesSearch'
import { NotesTagFilter } from './NotesTagFilter'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { ErrorMessage } from '@/components/common/ErrorMessage'

export const NotesList = () => {
  const { notes, loading, error, searchNotes } = useNotes()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredNotes = useMemo(() => {
    let filtered = searchQuery ? searchNotes(searchQuery) : notes
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      )
    }
    
    return filtered
  }, [notes, searchQuery, selectedTags, searchNotes])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    notes.forEach(note => note.tags.forEach((tag: string) => tags.add(tag)))
    return Array.from(tags)
  }, [notes])

  if (error) return <ErrorMessage error={error} />
  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <NotesSearch 
          value={searchQuery} 
          onChange={setSearchQuery} 
        />
        <NotesTagFilter 
          notes={notes}
          selected={selectedTags}
          onChange={setSelectedTags}
        />
      </div>
      <NotesGrid notes={filteredNotes} />
    </div>
  )
} 