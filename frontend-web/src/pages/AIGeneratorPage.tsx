import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpenAIGenerator from '../components/OpenAIGenerator';
import { useNotes } from '../context/NoteContext';
import { FaRobot, FaArrowRight } from 'react-icons/fa';
import { useI18n } from '../context/I18nContext';

const AIGeneratorPage: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { addNote } = useNotes();
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);

  const handleSaveAsNote = async (text: string) => {
    try {
      // Extract a title from the first line or use a default
      const lines = text.split('\n').filter(line => line.trim());
      const title = lines.length > 0 ? lines[0].substring(0, 50) : t('ai.default_title');
      
      // Create a new note with the generated text
      const noteId = await addNote({
        title,
        content: text,
        tags: ['ai-generated']
      });
      
      if (noteId) {
        setSavedNoteId(noteId);
        // Optionally navigate to the new note
        // navigate(`/notes/${noteId}`);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleViewNote = () => {
    if (savedNoteId) {
      navigate(`/notes/${savedNoteId}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
          <FaRobot className="text-purple-600 dark:text-purple-400 text-3xl" />
        </div>
        <h1 className="font-architects-daughter text-4xl text-gray-900 dark:text-dark-text-primary mb-3">
          {t('ai.title')}
        </h1>
        <p className="font-patrick-hand text-xl text-gray-600 dark:text-dark-text-secondary">
          {t('ai.subtitle')}
        </p>
      </div>
      
      {savedNoteId && (
        <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/30 rounded-xl p-6 mb-6">
          <p className="text-green-800 dark:text-green-400 font-medium font-patrick-hand text-lg">
            {t('ai.save_success')}
          </p>
          <button
            onClick={handleViewNote}
            className="mt-3 inline-flex items-center font-patrick-hand text-blue-500 dark:text-dark-accent-blue hover:text-blue-600 dark:hover:text-dark-accent-blue-light"
          >
            {t('ai.view_note')}
            <FaArrowRight className="ml-1 text-sm" />
          </button>
        </div>
      )}
      
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-8 border border-gray-100 dark:border-dark-border-primary">
        <OpenAIGenerator onTextGenerated={handleSaveAsNote} />
      </div>
      
      <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-xl p-6 border border-gray-200 dark:border-dark-border-primary">
        <h3 className="font-architects-daughter text-xl font-bold text-gray-900 dark:text-dark-text-primary mb-4">
          {t('ai.tips_title')}
        </h3>
        <ul className="space-y-2 font-patrick-hand text-gray-700 dark:text-dark-text-secondary list-disc pl-5">
          <li>{t('ai.tip_1')}</li>
          <li>{t('ai.tip_2')}</li>
          <li>{t('ai.tip_3')}</li>
          <li>{t('ai.tip_4')}</li>
          <li>{t('ai.tip_5')}</li>
        </ul>
      </div>
    </div>
  );
};

export default AIGeneratorPage; 