import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../context/NoteContext';
import { FaEdit, FaTrash, FaTags } from 'react-icons/fa';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, onDelete }) => {
  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No notes found. Create your first note!</p>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {note.title}
              </h3>
              <div className="flex space-x-2">
                <Link
                  to={`/notes/edit/${note.id}`}
                  className="text-blue-500 hover:text-blue-700"
                  title="Edit note"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => onDelete(note.id!)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete note"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3 line-clamp-3 h-18">
              {note.content}
            </p>
            
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                <FaTags className="text-gray-400 mt-1 mr-1" />
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-2">
              {note.updatedAt && (
                <span>Updated: {formatDate(note.updatedAt)}</span>
              )}
            </div>
          </div>
          <Link
            to={`/notes/${note.id}`}
            className="block bg-gray-50 py-2 text-center text-sm text-blue-600 hover:bg-gray-100 transition-colors duration-200"
          >
            View Note
          </Link>
        </div>
      ))}
    </div>
  );
}; 