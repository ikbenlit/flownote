import React from 'react'
import Link from 'next/link'
import { Note } from '@/types/notes'
import { NoteCard } from '@/components/features/NoteCard'
import { EmptyState } from '@/components/common/EmptyState'

interface NotesGridProps {
  notes: Note[]
  className?: string
}

export const NotesGrid: React.FC<NotesGridProps> = ({ notes, className = '' }) => {
  if (notes.length === 0) {
    return (
      <EmptyState
        title="Geen notities gevonden"
        description="Maak een nieuwe notitie om te beginnen."
        actionText="Nieuwe Notitie"
        actionHref="/app/notes/new"
      />
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/app/notes/${note.id}?edit=true`}
        >
          <NoteCard note={note} variant="grid" />
        </Link>
      ))}
    </div>
  )
} 