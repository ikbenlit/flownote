import React, { useMemo } from 'react'
import { Tag } from 'lucide-react'
import { Note } from '@/types/notes'

interface NotesTagFilterProps {
  notes: Note[]
  selected: string[]
  onChange: (tags: string[]) => void
  className?: string
}

export const NotesTagFilter: React.FC<NotesTagFilterProps> = ({
  notes,
  selected,
  onChange,
  className = ''
}) => {
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    notes.forEach((note: Note) => {
      note.tags.forEach((tag: string) => tags.add(tag))
    })
    return Array.from(tags)
  }, [notes])

  return (
    <div className={`flex gap-2 ${className}`}>
      {allTags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => {
            onChange(
              selected.includes(tag)
                ? selected.filter(t => t !== tag)
                : [...selected, tag]
            )
          }}
          className={`flex items-center gap-1 px-3 py-2 rounded-lg border ${
            selected.includes(tag)
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-800'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
          }`}
        >
          <Tag className="w-4 h-4" />
          {tag}
        </button>
      ))}
    </div>
  )
} 