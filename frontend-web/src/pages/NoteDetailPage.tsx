import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NoteDetail } from '../components/NoteDetail';
import { useNotes } from '../context/NoteContext';
import { FaArrowLeft } from 'react-icons/fa';

export const NoteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNoteById, deleteNote } = useNotes();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [notFound, setNotFound] = useState(false);
  
  const note = id ? getNoteById(id) : undefined;
  
  useEffect(() => {
    if (id && !note) {
      setNotFound(true);
    }
  }, [id, note]);

  const handleDelete = async () => {
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    
    const success = await deleteNote(id);
    if (success) {
      navigate('/notes');
    }
    setShowConfirmDelete(false);
  };

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Notitie niet gevonden. De notitie is mogelijk verwijderd.
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
            <span>Terug naar Notities</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {note ? (
        <NoteDetail note={note} onDelete={handleDelete} />
      ) : (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Notitie verwijderen</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Weet je zeker dat je deze notitie wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Annuleren
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Verwijderen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 