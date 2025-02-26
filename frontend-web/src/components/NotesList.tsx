import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaTags, FaEye } from 'react-icons/fa';
import { Note } from '../context/NoteContext';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-patrick-hand text-xl text-gray-500">
          Nog geen notities gevonden. Begin met het maken van je eerste notitie!
        </p>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border-primary rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-caveat text-2xl text-gray-800 dark:text-dark-text-primary truncate flex-grow">
                {note.title}
              </h3>
              <div className="flex space-x-3 ml-4">
                <Link
                  to={`/notes/edit/${note.id}`}
                  className="text-green-500 dark:text-dark-accent-green hover:text-green-600 dark:hover:text-dark-accent-green-light transform hover:scale-110 transition-all duration-200"
                  title="Bewerk notitie"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <button
                  onClick={() => onDelete(note.id!)}
                  className="text-red-500 hover:text-red-600 transform hover:scale-110 transition-all duration-200"
                  title="Verwijder notitie"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 dark:from-dark-bg-tertiary dark:to-dark-border-primary opacity-30 rounded-lg"></div>
              <p className="font-kalam text-gray-700 dark:text-dark-text-secondary mb-4 line-clamp-3 relative p-3 rounded-lg">
                {note.content}
              </p>
            </div>
            
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <FaTags className="text-gray-400 dark:text-dark-text-secondary mt-1" />
                {note.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="font-patrick-hand bg-green-100 dark:bg-dark-bg-tertiary text-green-800 dark:text-dark-accent-green px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="font-patrick-hand text-sm text-gray-500 mb-4">
              {note.updatedAt && (
                <span>Bijgewerkt op: {formatDate(note.updatedAt)}</span>
              )}
            </div>

            <Link
              to={`/notes/${note.id}`}
              className="inline-flex items-center justify-center w-full px-4 py-2 font-patrick-hand text-lg text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
            >
              <FaEye className="mr-2" />
              Bekijk Notitie
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}; 