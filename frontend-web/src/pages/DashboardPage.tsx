import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMicrophone, FaRobot, FaArrowRight } from 'react-icons/fa';
import { useI18n } from '../context/I18nContext';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NoteContext';

export const DashboardPage: React.FC = () => {
  const { t } = useI18n();
  const { currentUser } = useAuth();
  const { notes } = useNotes();
  
  // Get the 3 most recent notes
  const recentNotes = notes.slice(0, 3);
  
  // Get user's first name for personalized greeting
  const firstName = currentUser?.displayName?.split(' ')[0] || '';

  // Format date helper function
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    // Handle Firestore Timestamp objects
    if (timestamp.toDate && typeof timestamp.toDate === 'function') {
      return timestamp.toDate().toLocaleDateString();
    }
    
    // Handle regular Date objects or strings
    return new Date(timestamp).toLocaleDateString();
  };

  // Strip HTML tags for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-8">
        <h1 className="font-architects-daughter text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
          {t('dashboard.welcome')}{firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="font-patrick-hand text-xl text-gray-600 dark:text-dark-text-secondary">
          {t('dashboard.subtitle')}
        </p>
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="font-architects-daughter text-2xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          {t('dashboard.quick_actions')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/notes/new" 
            className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
              <FaPlus className="text-green-600 dark:text-green-400 text-2xl" />
            </div>
            <h3 className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              {t('dashboard.create_note')}
            </h3>
          </Link>
          
          <Link 
            to="/transcribe" 
            className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <FaMicrophone className="text-blue-600 dark:text-blue-400 text-2xl" />
            </div>
            <h3 className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              {t('dashboard.start_recording')}
            </h3>
          </Link>
          
          <Link 
            to="/ai-generator" 
            className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
              <FaRobot className="text-purple-600 dark:text-purple-400 text-2xl" />
            </div>
            <h3 className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              {t('dashboard.generate_ai')}
            </h3>
          </Link>
        </div>
      </div>
      
      {/* Recent Notes */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-architects-daughter text-2xl font-bold text-gray-900 dark:text-dark-text-primary">
            {t('dashboard.recent_notes')}
          </h2>
          <Link 
            to="/notes" 
            className="font-patrick-hand text-blue-500 dark:text-dark-accent-blue hover:text-blue-600 dark:hover:text-dark-accent-blue-light flex items-center"
          >
            {t('dashboard.view_all')}
            <FaArrowRight className="ml-1 text-sm" />
          </Link>
        </div>
        
        {recentNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentNotes.map(note => (
              <Link 
                key={note.id} 
                to={`/notes/${note.id}`}
                className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200 group"
              >
                <h3 className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-2 truncate">
                  {note.title}
                </h3>
                <div className="prose prose-sm dark:prose-invert max-w-none mb-4 overflow-hidden line-clamp-3">
                  <div 
                    className="text-gray-600 dark:text-dark-text-secondary font-patrick-hand"
                    dangerouslySetInnerHTML={{ 
                      __html: stripHtml(note.content).substring(0, 200) + (note.content.length > 200 ? '...' : '') 
                    }} 
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="font-patrick-hand text-sm text-gray-500 dark:text-dark-text-tertiary">
                    {t('notes.updated')} {formatDate(note.updatedAt)}
                  </p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex gap-2">
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-patrick-hand rounded-full bg-blue-100 dark:bg-dark-bg-tertiary text-blue-600 dark:text-dark-accent-blue"
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs font-patrick-hand rounded-full bg-gray-100 dark:bg-dark-bg-tertiary text-gray-600 dark:text-dark-text-secondary">
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-8 text-center">
            <p className="font-patrick-hand text-xl text-gray-600 dark:text-dark-text-secondary">
              {t('dashboard.no_recent_notes')}
            </p>
            <Link 
              to="/notes/new" 
              className="inline-flex items-center mt-4 px-6 py-3 font-patrick-hand text-lg rounded-xl text-white bg-green-500 hover:bg-green-600 dark:bg-dark-accent-green dark:hover:bg-dark-accent-green-light transform hover:scale-105 transition-all duration-200 shadow-md"
            >
              <FaPlus className="mr-2" />
              {t('notes.create')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}; 