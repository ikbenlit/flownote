import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';

interface UserMenuProps {
  isCollapsed?: boolean;
}

export const UserMenu: React.FC<UserMenuProps> = ({ isCollapsed = false }) => {
  const { currentUser, loading, signOut } = useAuth();
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [photoError, setPhotoError] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Reset photo error when user changes
  useEffect(() => {
    setPhotoError(false);
  }, [currentUser?.uid]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleImageError = () => {
    setPhotoError(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-dark-bg-tertiary animate-pulse"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Don't show user menu if not logged in
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button 
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary transition-colors duration-200"
        aria-label={t('user.menu')}
        aria-expanded={isOpen}
      >
        {currentUser.photoURL && !photoError ? (
          <img 
            src={currentUser.photoURL} 
            alt={t('auth.profile.image')}
            onError={handleImageError}
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-dark-border-primary"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-dark-accent-blue flex items-center justify-center text-white">
            <FaUser className="w-4 h-4" />
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`fixed ${
          isCollapsed 
            ? 'left-16' 
            : 'left-4'
        } mt-2 w-64 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg border border-gray-200 dark:border-dark-border-primary overflow-hidden z-50 transform transition-all duration-200 ease-out ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        {/* User Info */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border-primary">
          <div className="flex items-center">
            {currentUser.photoURL && !photoError ? (
              <img 
                src={currentUser.photoURL} 
                alt={t('auth.profile.image')}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-dark-border-primary mr-3"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-dark-accent-blue flex items-center justify-center text-white mr-3">
                <FaUser className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-dark-text-primary truncate">
                {currentUser.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          {/* Theme Toggle */}
          <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary">
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary">
              {t('theme.toggle')}
            </span>
            <ThemeToggle compact={true} />
          </div>

          {/* Language Selector */}
          <div className="px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary">
            <span className="text-sm text-gray-700 dark:text-dark-text-secondary">
              {t('language.select')}
            </span>
            <LanguageSelector compact={true} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-dark-border-primary my-1"></div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary flex items-center justify-between"
          >
            <span>{t('auth.logout')}</span>
            <FaSignOutAlt className="w-4 h-4 text-gray-500 dark:text-dark-text-tertiary" />
          </button>
        </div>
      </div>
    </div>
  );
}; 