import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../context/NoteContext';
import { FaEdit, FaTrash, FaArrowLeft, FaTags } from 'react-icons/fa';
import TipTapContent from './TipTapContent';

interface NoteDetailProps {
  note: Note;
  onDelete: (id: string) => void;
}

export const NoteDetail: React.FC<NoteDetailProps> = ({ note, onDelete }) => {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link to="/notes" className="text-blue-600 dark:text-dark-accent-blue hover:text-blue-800 dark:hover:text-dark-accent-blue-light flex items-center">
            <FaArrowLeft className="mr-1" />
            <span>Back to Notes</span>
          </Link>
          <div className="flex space-x-3">
            <Link
              to={`/notes/edit/${note.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 dark:bg-dark-accent-blue hover:bg-blue-700 dark:hover:bg-dark-accent-blue-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-dark-accent-blue"
            >
              <FaEdit className="mr-1.5" />
              Edit
            </Link>
            <button
              onClick={() => onDelete(note.id!)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-1.5" />
              Delete
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">{note.title}</h1>
        
        <div className="text-sm text-gray-500 dark:text-dark-text-secondary mb-6">
          {note.createdAt && (
            <p>Created: {formatDate(note.createdAt)}</p>
          )}
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <p>Updated: {formatDate(note.updatedAt)}</p>
          )}
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            <FaTags className="text-gray-400 dark:text-dark-text-secondary mt-1 mr-1" />
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 dark:bg-dark-bg-tertiary text-blue-800 dark:text-dark-accent-blue text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <TipTapContent content={note.content} />
        </div>
      </div>
    </div>
  );
}; 