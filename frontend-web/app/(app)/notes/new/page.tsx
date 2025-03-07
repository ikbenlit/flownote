'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { NoteEditor } from '@/components/NoteEditor'
import { useNotes } from '@/context/NoteContext'
import { useI18n } from '@/context/I18nContext'

export default function NewNotePage() {
  const router = useRouter()
  const { addNote } = useNotes()
  const { t } = useI18n()

  const handleSave = async (noteData: { title: string; content: string; tags: string[]; taskMarkings: any[] }) => {
    try {
      const noteId = await addNote(noteData)
      router.push(`/notes/${noteId}`)
    } catch (error) {
      console.error('Error creating note:', error)
      // Error wordt al afgehandeld in de NoteEditor component
    }
  }

  const handleCancel = () => {
    router.push('/notes')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('notes.new_note')}
      </h1>
      <NoteEditor
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
} 