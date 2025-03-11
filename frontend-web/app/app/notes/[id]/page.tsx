'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NoteEditor } from '@/components/NoteEditor'
import { useNotes } from '@/context/NoteContext'
import { useI18n } from '@/context/I18nContext'
import { Note } from '@/types/notes'

interface Props {
  params: {
    id: string
  }
}

export default function NotePage({ params }: Props) {
  const router = useRouter()
  const { getNote, updateNote } = useNotes()
  const { t } = useI18n()
  const [note, setNote] = useState<Note | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNote = () => {
      const foundNote = getNote(params.id)
      if (!foundNote) {
        router.push('/notes')
        return
      }
      setNote(foundNote)
      setLoading(false)
    }

    loadNote()
  }, [params.id, getNote, router])

  const handleSave = async (noteData: { title: string; content: string; tags: string[]; taskMarkings: any[] }) => {
    try {
      await updateNote(params.id, noteData)
      router.push('/notes')
    } catch (error) {
      console.error('Error updating note:', error)
      // Error wordt al afgehandeld in de NoteEditor component
    }
  }

  const handleCancel = () => {
    router.push('/notes')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('notes.edit_note')}
      </h1>
      {note && (
        <NoteEditor
          initialNote={note}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
} 