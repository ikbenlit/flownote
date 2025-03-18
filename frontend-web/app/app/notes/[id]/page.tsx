'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useNotes } from '@/hooks/useNotes'
import { useI18n } from '@/hooks/useI18n'
import { Note } from '@/types/notes'
import { NoteEditor } from '@/components/NoteEditor'

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
        router.push('/app/notes')
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
      router.push('/app/notes')
    } catch (error) {
      console.error('Error updating note:', error)
      // Error wordt al afgehandeld in de NoteEditor component
    }
  }

  const handleCancel = () => {
    router.push('/app/notes')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!note) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('notes.edit')}
      </h1>
      <NoteEditor
        initialNote={note}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
} 