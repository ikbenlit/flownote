import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NotesList } from '../components/NotesList';
import { useNotes } from '../context/NoteContext';
import { FaPlus, FaSearch, FaMicrophone, FaStickyNote, FaRobot } from 'react-icons/fa';
import AuthButton from '../components/AuthButton';
import { ThemeToggle } from '../components/ThemeToggle';

export const NotesPage: React.FC = () => {
  const { notes, loading, error, deleteNote, searchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);

  const filteredNotes = searchQuery ? searchNotes(searchQuery) : notes;

  const handleDeleteClick = (id: string) => {
    setShowConfirmDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (showConfirmDelete) {
      await deleteNote(showConfirmDelete);
      setShowConfirmDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary transition-colors duration-200">
      {/* App Header */}
      <nav className="bg-white dark:bg-dark-bg-secondary shadow-sm dark:shadow-dark-bg-primary mb-8">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link to="/app" className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary">
              FlowNote
            </Link>
            <Link to="/transcribe" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
              <FaMicrophone className="mr-1.5" />
              Transcribe
            </Link>
            <Link to="/notes" className="font-patrick-hand text-blue-500 dark:text-dark-accent-blue hover:text-blue-600 dark:hover:text-dark-accent-blue-light flex items-center">
              <FaStickyNote className="mr-1.5" />
              Notes
            </Link>
            <Link to="/ai-generator" className="font-patrick-hand text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent flex items-center">
              <FaRobot className="mr-1.5" />
              AI Generator
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-dark-bg-tertiary rounded-full mb-4">
            <FaStickyNote className="text-green-600 dark:text-dark-accent-green text-3xl" />
          </div>
          <h1 className="font-architects-daughter text-4xl text-gray-900 dark:text-dark-text-primary mb-3">
            Mijn Notities
          </h1>
          <p className="font-patrick-hand text-xl text-gray-600 dark:text-dark-text-secondary">
            Al je gedachten en ideeën op één plek
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative flex-grow max-w-2xl w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400 dark:text-dark-text-secondary" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 font-patrick-hand text-lg border border-gray-200 dark:border-dark-border-primary rounded-xl leading-5 bg-white dark:bg-dark-bg-secondary text-gray-900 dark:text-dark-text-primary placeholder-gray-400 dark:placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-dark-accent-green focus:border-green-500 dark:focus:border-dark-accent-green transition-all duration-200"
              placeholder="Zoek in je notities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link
            to="/notes/new"
            className="inline-flex items-center px-6 py-3 font-patrick-hand text-lg rounded-xl text-white bg-green-500 hover:bg-green-600 dark:bg-dark-accent-green dark:hover:bg-dark-accent-green-light transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            <FaPlus className="mr-2" />
            Nieuwe Notitie
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 dark:border-dark-accent-green"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-6 rounded-xl mb-6 font-patrick-hand">
            <div className="flex">
              <div className="ml-3">
                <p className="text-lg text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <NotesList notes={filteredNotes} onDelete={handleDeleteClick} />
        )}

        {/* Delete Confirmation Modal */}
        {showConfirmDelete && (
          <div className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-dark-bg-secondary border-gray-200 dark:border-dark-border-primary">
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-dark-text-primary">Notitie Verwijderen</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500 dark:text-dark-text-secondary">
                    Weet je zeker dat je deze notitie wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
                  </p>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowConfirmDelete(null)}
                    className="px-4 py-2 bg-gray-200 dark:bg-dark-bg-tertiary text-gray-800 dark:text-dark-text-primary text-base font-medium rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-dark-border-primary focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-dark-border-secondary"
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
    </div>
  );
}; 