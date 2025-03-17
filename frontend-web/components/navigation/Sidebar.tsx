'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  SparklesIcon, 
  MicrophoneIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Iconen voor de sidebar
const SimpleHomeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SimpleNoteIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SimpleTaskIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SimpleAiIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SimpleMicIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface NavItemProps {
  href: string;
  icon: React.ElementType | React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: (() => void) | (() => Promise<void>);
}

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const NavItem = ({ href, icon, label, isActive, isCollapsed, onClick }: NavItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      if (href === '#') {
        e.preventDefault();
      }
      onClick();
    }
  };

  return (
    <Link
      href={href}
      className={`flex items-center rounded-md transition-colors px-3 py-1.5 my-1 ${
        isActive 
          ? 'bg-gray-200 text-gray-800 dark:bg-dark-bg-tertiary dark:text-dark-text-primary' 
          : 'hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary'
      }`}
      onClick={handleClick}
    >
      {typeof icon === 'function' 
        ? <span className="w-5 h-5">{React.createElement(icon)}</span>
        : icon
      }
      {!isCollapsed && <span className="ml-2 text-sm font-medium">{label}</span>}
    </Link>
  );
};

// UserAvatar component
const UserAvatar = ({ user, onClick, isCollapsed }: { user: any, onClick: () => void, isCollapsed: boolean }) => {
  const [imageError, setImageError] = useState(false);
  
  // Controleer of user een Google account heeft (via photoURL) en er geen fout is opgetreden
  if (user?.photoURL && !imageError) {
    return (
      <button 
        onClick={onClick}
        className="flex items-center space-x-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded-md"
      >
        <Image 
          src={user.photoURL} 
          alt={user.displayName || 'User'} 
          width={32} 
          height={32} 
          className="rounded-full"
          onError={() => setImageError(true)}
          unoptimized={true}
        />
        {!isCollapsed && <span className="text-sm font-medium truncate">{user.displayName || user.email}</span>}
      </button>
    );
  }
  
  // Anders toon initialen in een cirkel
  const getInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return 'FN'; // Fallback: FlowNote
  };
  
  return (
    <button 
      onClick={onClick}
      className="flex items-center space-x-2 p-2 w-full hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary rounded-md"
    >
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
        {getInitials()}
      </div>
      {!isCollapsed && <span className="text-sm font-medium truncate">{user?.displayName || user?.email}</span>}
    </button>
  );
};

export default function Sidebar({ onCollapseChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabletView, setIsTabletView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Voor het uitklappen op mobiel
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  // Media query voor mobile en tablet view
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 640);
      setIsTabletView(width >= 640 && width < 1024);
      
      // Reset expanded state op desktop
      if (width >= 1024) {
        setIsExpanded(false);
      }
    };
    
    // Check bij eerste render
    checkScreenSize();
    
    // Luister naar resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sluit de uitgeklapte sidebar bij paginawijziging op mobiel/tablet
  useEffect(() => {
    if (isMobileView || isTabletView) {
      setIsExpanded(false);
    }
  }, [pathname, isMobileView, isTabletView]);

  // Sluit de gebruikersmenu als er buiten wordt geklikt
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Controleer of het menu open is
      if (!isUserMenuOpen) return;
      
      // Check of de click buiten zowel de menu button als het menu zelf was
      if (
        userMenuRef.current && 
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    // Gebruik mousedown voor click-outside detectie
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Sluit de uitgeklapte sidebar als er buiten wordt geklikt op mobiel/tablet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded && (isMobileView || isTabletView)) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isMobileView, isTabletView]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Uitloggen mislukt:', error);
    }
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'nl' ? 'en' : 'nl';
    setLocale(newLocale);
  };

  const navigationItems = [
    { href: '/app/dashboard', icon: SimpleHomeIcon, label: t('dashboard.title') },
    { href: '/app/notes', icon: SimpleNoteIcon, label: t('notes.title') },
    { href: '/app/tasks', icon: SimpleTaskIcon, label: t('tasks.title') },
    { href: '/app/ai-generator', icon: SimpleAiIcon, label: t('ai_generator.title') },
    { href: '/app/transcribe', icon: SimpleMicIcon, label: t('transcription.title') },
  ];

  // Helper functie om te controleren of een route actief is
  const isRouteActive = (href: string) => {
    if (href === '#') return false;
    // Verwijder eventuele trailing slashes voor de vergelijking
    const currentPath = pathname?.replace(/\/$/, '');
    const targetPath = href.replace(/\/$/, '');
    return currentPath === targetPath;
  };

  const toggleCollapse = () => {
    if (isMobileView || isTabletView) {
      setIsExpanded(!isExpanded);
      onCollapseChange?.(!isExpanded);
    } else {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      onCollapseChange?.(newCollapsedState);
    }
  };

  return (
    <>
      {/* Mobile/Tablet Backdrop Overlay wanneer uitgeklapt */}
      {(isMobileView || isTabletView) && isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar Component */}
      <aside 
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full
          transition-all duration-300 ease-in-out z-[60] 
          border-r border-gray-200 dark:border-dark-border-primary
          ${isMobileView || isTabletView
            ? `w-16 ${isExpanded ? 'translate-x-0' : 'translate-x-0'}`
            : isCollapsed ? 'w-16' : 'w-64'
          }
          ${isExpanded && (isMobileView || isTabletView) ? 'w-64' : ''}
          bg-gray-50 dark:bg-dark-bg-secondary
        `}
      >
        <div className="flex flex-col h-full py-4">
          {/* Header met logo en collapse button */}
          <div className="flex items-center justify-between px-3 mb-4">
            {(!isCollapsed && !isMobileView && !isTabletView) || 
             ((isMobileView || isTabletView) && isExpanded) ? (
              <h1 className="text-lg font-bold font-heading truncate">
                {t('app.title')}
              </h1>
            ) : (
              <span className="text-lg font-bold font-heading">
                FN
              </span>
            )}
            {!isMobileView && !isTabletView && (
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? (
                  <ChevronRightIcon className="w-4 h-4" />
                ) : (
                  <ChevronLeftIcon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Hoofdnavigatie */}
          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={isRouteActive(item.href)}
                isCollapsed={(isCollapsed && !isMobileView && !isTabletView) || 
                             ((isMobileView || isTabletView) && !isExpanded)}
                onClick={() => {
                  if (isMobileView || isTabletView) {
                    setIsExpanded(false);
                  }
                }}
              />
            ))}
          </nav>

          {/* Gebruiker Avatar Button */}
          <div className="mt-auto px-2">
            <div ref={userButtonRef} className="relative">
              <UserAvatar 
                user={currentUser} 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                isCollapsed={(isCollapsed && !isMobileView && !isTabletView) || 
                             ((isMobileView || isTabletView) && !isExpanded)}
              />

              {/* User Menu Popover */}
              {isUserMenuOpen && (
                <div 
                  ref={userMenuRef}
                  className={`
                    absolute bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg 
                    border border-gray-200 dark:border-dark-border-primary overflow-hidden
                    bottom-4 left-0 ml-16 w-56
                    z-[70]
                  `}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-dark-border-primary">
                    <p className="text-sm font-medium">{currentUser?.displayName || currentUser?.email}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{currentUser?.email}</p>
                  </div>
                  
                  <div className="p-2">
                    {/* Instellingen Link */}
                    <Link 
                      href="/app/settings"
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
                    >
                      <Cog6ToothIcon className="w-5 h-5 mr-2" />
                      <span>{t('settings.title')}</span>
                    </Link>

                    {/* Thema Toggle */}
                    <button 
                      onClick={toggleTheme}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                        theme === 'dark' ? 'bg-gray-100 dark:bg-dark-bg-tertiary' : ''
                      }`}
                      aria-label={theme === 'dark' ? t('settings.theme_toggle_aria_label.to_light') : t('settings.theme_toggle_aria_label.to_dark')}
                    >
                      {theme === 'dark' ? (
                        <>
                          <SunIcon className="w-5 h-5 mr-2" />
                          <span>{t('settings.light_mode')}</span>
                        </>
                      ) : (
                        <>
                          <MoonIcon className="w-5 h-5 mr-2" />
                          <span>{t('settings.dark_mode')}</span>
                        </>
                      )}
                    </button>
                    
                    {/* Taal Wissel */}
                    <button 
                      onClick={toggleLanguage}
                      className={`w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary ${
                        locale === 'nl' ? 'bg-gray-100 dark:bg-dark-bg-tertiary' : ''
                      }`}
                    >
                      <GlobeAltIcon className="w-5 h-5 mr-2" />
                      <span>{t('settings.language')}: {locale === 'nl' ? 'Nederlands' : 'English'}</span>
                    </button>
                    
                    {/* Uitloggen */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-red-500"
                    >
                      <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                      <span>{t('auth.logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Extra transparent overlay om te zorgen dat het menu sluit bij klikken buiten het menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-[65]" 
          onClick={() => setIsUserMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}