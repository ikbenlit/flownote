'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useNotes } from '@/context/NoteContext'
import { useI18n } from '@/context/I18nContext'
import { FaPlus, FaEdit } from 'react-icons/fa'

export default function NotesPage() {
  const router = useRouter()
  const { notes } = useNotes()
  const { t } = useI18n()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {note.title || t('notes.no_title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {note.content}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/app/notes/${note.id}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <FaEdit className="mr-1" />
                {t('notes.edit')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t('notes.no_notes')}
          </p>
          <Link
            href="/app/notes/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaPlus className="mr-2" />
            {t('notes.create')}
          </Link>
        </div>
      )}
    </div>
  )
} 