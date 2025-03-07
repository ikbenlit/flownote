'use client'

import React from 'react'
import NotesList from '@/components/features/NotesList'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useI18n } from '@/context/I18nContext'

export default function NotesPage() {
  const { t } = useI18n()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t('notes.title')}
        </h1>
        <Link
          href="/notes/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('notes.create_new')}
        </Link>
      </div>
      <NotesList />
    </div>
  )
} 