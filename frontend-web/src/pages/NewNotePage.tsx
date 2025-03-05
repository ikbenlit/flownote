import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteEditor } from '../components/NoteEditor';
import { useNotes } from '../context/NoteContext';
import { FaArrowLeft } from 'react-icons/fa';
import { TaskMarking } from '../context/NoteContext';

export const NewNotePage: React.FC = () => {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (noteData: { title: string; content: string; tags: string[]; taskMarkings: TaskMarking[] }): Promise<string> => {
    try {
      setIsLoading(true);
      const noteId = await addNote(noteData);
      if (!noteId) {
        throw new Error('Geen noteId ontvangen na opslaan');
      }
      navigate(`/notes/${noteId}`);
      return noteId;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/notes');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={handleCancel}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          <span>Back to Notes</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Note</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <NoteEditor
            initialNote={{
              title: '',
              content: '',
              tags: [],
              taskMarkings: [],
            }}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}; 