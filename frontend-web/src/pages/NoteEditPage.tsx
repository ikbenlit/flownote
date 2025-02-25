import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteEditor } from '../components/NoteEditor';
import { useNotes } from '../context/NoteContext';
import { FaArrowLeft } from 'react-icons/fa';

export const NoteEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNoteById, updateNote } = useNotes();
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  
  const note = id ? getNoteById(id) : undefined;
  
  useEffect(() => {
    if (id && !note) {
      setNotFound(true);
    }
  }, [id, note]);

  const handleSave = async (noteData: { title: string; content: string; tags: string[] }) => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const success = await updateNote(id, noteData);
      if (success) {
        navigate(`/notes/${id}`);
      }
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (id) {
      navigate(`/notes/${id}`);
    } else {
      navigate('/notes');
    }
  };

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Note not found. The note may have been deleted.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/notes')}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <FaArrowLeft className="mr-1" />
            <span>Back to Notes</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          <span>Back to Note</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : note ? (
          <NoteEditor
            initialNote={note}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}; 