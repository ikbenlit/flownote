import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../context/NoteContext';
import { FaEdit, FaTrash, FaArrowLeft, FaTags } from 'react-icons/fa';

interface NoteDetailProps {
  note: Note;
  onDelete: () => void;
}

export const NoteDetail: React.FC<NoteDetailProps> = ({ note, onDelete }) => {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link to="/notes" className="text-blue-600 hover:text-blue-800 flex items-center">
            <FaArrowLeft className="mr-1" />
            <span>Terug naar Notities</span>
          </Link>
          <div className="flex space-x-3">
            <Link
              to={`/notes/edit/${note.id}`}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaEdit className="mr-1.5" />
              Bewerken
            </Link>
            <button
              onClick={() => onDelete()}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-1.5" />
              Verwijderen
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{note.title}</h1>
        
        <div className="text-sm text-gray-500 mb-6">
          {note.createdAt && (
            <p>Aangemaakt: {formatDate(note.createdAt)}</p>
          )}
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <p>Bijgewerkt: {formatDate(note.updatedAt)}</p>
          )}
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            <FaTags className="text-gray-400 mt-1 mr-1" />
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
        </div>
      </div>
    </div>
  );
}; 