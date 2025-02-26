import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMicrophone, FaStickyNote, FaRobot, FaHome, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import AuthButton from './AuthButton';
import { useI18n } from '../context/I18nContext';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const { t } = useI18n();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      path: '/app',
      icon: <FaHome />,
      label: t('nav.dashboard'),
    },
    {
      path: '/transcribe',
      icon: <FaMicrophone />,
      label: t('nav.transcribe'),
    },
    {
      path: '/notes',
      icon: <FaStickyNote />,
      label: t('nav.notes'),
    },
    {
      path: '/ai-generator',
      icon: <FaRobot />,
      label: t('nav.ai-generator'),
    },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white dark:bg-dark-bg-secondary shadow-md transition-all duration-300 z-10 flex flex-col
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border-primary">
        <Link to="/app" className="font-architects-daughter font-bold text-gray-900 dark:text-dark-text-primary flex items-center">
          {!isCollapsed && (
            <span className="text-xl">{t('app.name')}</span>
          )}
          {isCollapsed && (
            <span className="text-xl">FN</span>
          )}
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-gray-500 dark:text-dark-text-secondary"
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-base transition-colors duration-200
                  ${isActive(item.path)
                    ? 'text-blue-500 dark:text-dark-accent-blue bg-blue-50 dark:bg-dark-bg-tertiary border-r-4 border-blue-500 dark:border-dark-accent-blue'
                    : 'text-gray-600 dark:text-dark-text-secondary hover:text-blue-500 dark:hover:text-dark-text-accent hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && <span className="ml-4 font-patrick-hand">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className={`p-4 border-t border-gray-200 dark:border-dark-border-primary ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex ${isCollapsed ? 'flex-col items-center space-y-4' : 'items-center space-x-4'}`}>
          <ThemeToggle />
          {!isCollapsed && <LanguageSelector />}
          <AuthButton />
        </div>
      </div>
    </div>
  );
}; 