import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
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
}; 