import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Note } from '@/types/notes';
import { RichTextDisplay } from '@/components/RichTextDisplay';

interface NoteCardProps {
  note: Note;
  variant?: 'grid' | 'list' | 'preview';
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, variant = 'grid' }) => {
  const cardClasses = {
    grid: 'block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow',
    list: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow',
    preview: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
  };

  const titleClasses = {
    grid: 'text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100',
    list: 'text-xl font-semibold text-gray-900 dark:text-white mb-2',
    preview: 'text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'
  };

  const contentClasses = {
    grid: 'mb-4 line-clamp-3',
    list: 'mb-4',
    preview: 'mb-4 line-clamp-3'
  };

  const getContentVariant = () => {
    switch (variant) {
      case 'list':
        return 'full';
      case 'grid':
      case 'preview':
      default:
        return 'preview';
    }
  };

  return (
    <div className={cardClasses[variant]}>
      <h3 className={titleClasses[variant]}>
        {note.title || 'Geen titel'}
      </h3>
      
      <div className={contentClasses[variant]}>
        <RichTextDisplay 
          content={note.content} 
          variant={getContentVariant()} 
        />
      </div>

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

      <div className="mt-4 flex justify-end">
        <Link
          href={`/app/notes/${note.id}?edit=true`}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Bewerken
        </Link>
      </div>
    </div>
  );
}; 