'use client'

import React from 'react'
import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'
import { FaPlus } from 'react-icons/fa'
import { NotesList } from '@/components/features/notes/NotesList'

export default function NotesPage() {
  const { t } = useI18n()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('notes.title')}
        </h1>
        <Link
          href="/app/notes/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          {t('notes.create')}
        </Link>
      </div>

      <NotesList />
    </div>
  )
} 