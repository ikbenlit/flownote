import React from 'react';
import { useI18n } from '../context/I18nContext';

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { language, setLanguage, t } = useI18n();

  if (compact) {
    return (
      <div className="relative inline-block">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'nl' | 'en')}
          className="appearance-none bg-transparent pr-8 pl-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md 
                    text-gray-700 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t('language.select')}
        >
          <option value="nl">{t('language.nl')}</option>
          <option value="en">{t('language.en')}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-dark-text-primary">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  }

  // Simple button toggle for dropdown menu
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setLanguage('nl')}
        className={`px-2 py-1 text-xs rounded-md transition-colors ${
          language === 'nl'
            ? 'bg-blue-100 text-blue-700 dark:bg-dark-accent-blue dark:text-white font-medium'
            : 'bg-gray-100 text-gray-700 dark:bg-dark-bg-tertiary dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border-primary'
        }`}
        aria-pressed={language === 'nl'}
      >
        NL
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-xs rounded-md transition-colors ${
          language === 'en'
            ? 'bg-blue-100 text-blue-700 dark:bg-dark-accent-blue dark:text-white font-medium'
            : 'bg-gray-100 text-gray-700 dark:bg-dark-bg-tertiary dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-border-primary'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
}; 