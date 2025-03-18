'use client'

import React, { useState, useMemo } from 'react'
import { useNotes } from '@/context/NoteContext'
import { Note } from '@/types/notes'
import Link from 'next/link'
import { Search, Plus, Tag } from 'lucide-react'
import { NoteCard } from './NoteCard'

interface NotesGridProps {
  notes: Note[]
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          Geen notities gevonden. Maak een nieuwe notitie om te beginnen.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/app/notes/${note.id}`}
        >
          <NoteCard note={note} variant="grid" />
        </Link>
      ))}
    </div>
  )
}

export default function NotesList() {
  const { notes, loading, error, searchNotes } = useNotes()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Verzamel alle unieke tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    notes.forEach(note => note.tags.forEach((tag: string) => tags.add(tag)))
    return Array.from(tags)
  }, [notes])

  // Filter notities op basis van zoekopdracht en geselecteerde tags
  const filteredNotes = useMemo(() => {
    let filtered = searchQuery ? searchNotes(searchQuery) : notes
    
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      )
    }
    
    return filtered
  }, [notes, searchQuery, selectedTags, searchNotes])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          Er is een fout opgetreden: {error.message}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Zoek notities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex gap-2">
          {allTags.map((tag: string) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )
              }}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
                selectedTags.includes(tag)
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              <Tag className="w-4 h-4" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : (
        <NotesGrid notes={filteredNotes} />
      )}
    </div>
  )
} 