import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';

interface ThemeToggleProps {
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ compact = false }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { t } = useI18n();

  if (compact) {
    return (
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
      >
        <div className="relative w-6 h-6">
          <div
            className={`absolute inset-0 transform transition-transform duration-500 ${
              isDarkMode ? 'rotate-0' : 'rotate-90 opacity-0'
            }`}
          >
            <FaMoon className="w-6 h-6" />
          </div>
          <div
            className={`absolute inset-0 transform transition-transform duration-500 ${
              isDarkMode ? '-rotate-90 opacity-0' : 'rotate-0'
            }`}
          >
            <FaSun className="w-6 h-6" />
          </div>
        </div>
      </button>
    );
  }

  // Toggle switch style for dropdown menu
  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      style={{ backgroundColor: isDarkMode ? '#4F46E5' : '#D1D5DB' }}
      aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
    >
      <span className="sr-only">{isDarkMode ? t('theme.light') : t('theme.dark')}</span>
      <span
        className={`${
          isDarkMode ? 'translate-x-6 bg-dark-bg-secondary' : 'translate-x-1 bg-white'
        } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out flex items-center justify-center`}
      >
        {isDarkMode ? (
          <FaMoon className="w-2 h-2 text-blue-400" />
        ) : (
          <FaSun className="w-2 h-2 text-yellow-400" />
        )}
      </span>
    </button>
  );
}; 