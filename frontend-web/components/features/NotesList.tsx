'use client'

import React, { useState, useMemo } from 'react'
import { useNotes } from '@/context/NoteContext'
import { Note } from '@/types/notes'
import Link from 'next/link'
import { Search, Plus, Tag, Calendar } from 'lucide-react'

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
          href={`/dashboard/notes/${note.id}`}
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {note.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {note.content}
          </p>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(note.updatedAt).toLocaleDateString('nl-NL')}
            </span>
            {note.taskMarkings && note.taskMarkings.length > 0 && (
              <span className="flex items-center gap-1">
                {note.taskMarkings.filter(t => t.completed).length}/{note.taskMarkings.length} taken
              </span>
            )}
          </div>
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
    notes.forEach(note => note.tags.forEach(tag => tags.add(tag)))
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Mijn Notities
        </h2>
        <Link
          href="/dashboard/notes/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nieuwe Notitie
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Zoek in notities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />
        </div>
        
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Tag className="w-5 h-5 text-gray-400" />
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                )}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
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