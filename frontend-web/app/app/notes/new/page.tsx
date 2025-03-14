'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { NoteEditor } from '@/components/NoteEditor'
import { useNotes } from '@/context/NoteContext'
import { useI18n } from '@/context/I18nContext'

export default function NewNotePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addNote } = useNotes()
  const { t } = useI18n()

  // Ondersteun beide parameter namen (content en text)
  const transcriptionContent = searchParams.get('content') || searchParams.get('text')
  const initialNote = transcriptionContent ? {
    title: 'Nieuwe transcriptie', // Voeg een standaard titel toe
    content: decodeURIComponent(transcriptionContent), // Decode de URL-encoded tekst
    tags: ['transcriptie'], // Voeg een standaard tag toe
    taskMarkings: []
  } : undefined

  const handleSave = async (noteData: { title: string; content: string; tags: string[]; taskMarkings: any[] }) => {
    try {
      const noteId = await addNote(noteData)
      router.push(`/app/notes/${noteId}`)
    } catch (error) {
      console.error('Error creating note:', error)
      // Error wordt al afgehandeld in de NoteEditor component
    }
  }

  const handleCancel = () => {
    router.push('/app/notes')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('notes.create')}
      </h1>
      <NoteEditor
        initialNote={initialNote}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
} 