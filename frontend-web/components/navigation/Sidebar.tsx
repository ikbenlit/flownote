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
  SunIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Type voor verschillende schermformaten
type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

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

export default function Sidebar() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('lg');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: '0', left: '0' });
  
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, availableLocales } = useI18n();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('xs');
        setIsMobile(true);
        setIsTablet(false);
      } else if (width < 768) {
        setScreenSize('sm');
        setIsMobile(true);
        setIsTablet(false);
      } else if (width < 1024) {
        setScreenSize('md');
        setIsMobile(false);
        setIsTablet(true);
      } else if (width < 1280) {
        setScreenSize('lg');
        setIsMobile(false);
        setIsTablet(false);
      } else if (width < 1536) {
        setScreenSize('xl');
        setIsMobile(false);
        setIsTablet(false);
      } else {
        setScreenSize('2xl');
        setIsMobile(false);
        setIsTablet(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sluit de gebruikersmenu als er buiten wordt geklikt
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen &&
          userMenuRef.current && 
          !userMenuRef.current.contains(event.target as Node) &&
          userButtonRef.current &&
          !userButtonRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);
  
  // Update de menu positie wanneer het menu geopend wordt
  useEffect(() => {
    if (isUserMenuOpen && userButtonRef.current) {
      const buttonRect = userButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceRight = window.innerWidth - buttonRect.left;
      
      // Bepaal of het menu naar boven of naar beneden moet openen
      let top = buttonRect.bottom + 5 + 'px';
      if (spaceBelow < 250 && buttonRect.top > 250) {
        top = (buttonRect.top - 250) + 'px';
      }
      
      // Bepaal of het menu naar links of rechts moet openen
      let left = buttonRect.left + 'px';
      if (isCollapsed) {
        left = buttonRect.right + 5 + 'px';
      } else if (spaceRight < 250) {
        left = (window.innerWidth - 250) + 'px';
      }
      
      setMenuPosition({ top, left });
    }
  }, [isUserMenuOpen, isCollapsed]);

  // Extra debug logging
  useEffect(() => {
    console.log("Menu open:", isUserMenuOpen);
    console.log("Menu position:", menuPosition);
  }, [isUserMenuOpen, menuPosition]);

  const handleLogout = async () => {
    try {
      setIsUserMenuOpen(false);
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
    { href: '/app/dashboard', icon: SimpleHomeIcon, label: 'Dashboard' },
    { href: '/app/notes', icon: SimpleNoteIcon, label: 'Notities' },
    { href: '/app/tasks', icon: SimpleTaskIcon, label: 'Taken' },
    { href: '/app/ai-generator', icon: SimpleAiIcon, label: 'AI Generator' },
    { href: '/app/transcribe', icon: SimpleMicIcon, label: 'Transcriptie' },
  ];

  // Helper functie om te controleren of een route actief is
  const isRouteActive = (href: string) => {
    if (href === '#') return false;
    // Verwijder eventuele trailing slashes voor de vergelijking
    const currentPath = pathname?.replace(/\/$/, '');
    const targetPath = href.replace(/\/$/, '');
    return currentPath === targetPath;
  };

  const toggleSidebar = () => {
    if (isMobile || isTablet) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${(isMobile || isTablet) && isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => setIsOpen(false)} 
      />
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-gray-50 dark:bg-dark-bg-secondary
          transition-all duration-300 ease-in-out z-50
          ${(isMobile || isTablet) 
            ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-60`
            : `${isCollapsed ? 'w-14' : 'w-60'}`
          }
          border-r border-gray-200 dark:border-dark-border-primary
        `}
      >
        <div className="flex flex-col h-full py-4">
          {/* Header met logo en collapse button */}
          <div className="flex items-center justify-between px-3 mb-4">
            {!isCollapsed && <h1 className="text-lg font-bold font-heading truncate">FlowNote</h1>}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4" />
              ) : (
                <ChevronLeftIcon className="w-4 h-4" />
              )}
            </button>
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
                isCollapsed={isCollapsed}
                onClick={(isMobile || isTablet) ? () => setIsOpen(false) : undefined}
              />
            ))}
          </nav>

          {/* Gebruiker Avatar Button */}
          <div className="mt-auto px-2">
            <div ref={userButtonRef} className="relative">
              <UserAvatar 
                user={currentUser} 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                isCollapsed={isCollapsed}
              />

              {/* User Menu Popover */}
              {isUserMenuOpen && (
                <div 
                  ref={userMenuRef}
                  className="fixed z-50 w-64 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-lg border border-gray-200 dark:border-dark-border-primary overflow-hidden"
                  style={{
                    top: menuPosition.top,
                    left: menuPosition.left,
                  }}
                >
                  <div className="p-3 border-b border-gray-200 dark:border-dark-border-primary">
                    <p className="text-sm font-medium">{currentUser?.displayName || currentUser?.email}</p>
                    <p className="text-xs text-gray-500 dark:text-dark-text-secondary truncate">{currentUser?.email}</p>
                  </div>
                  
                  <div className="p-2">
                    {/* Thema Toggle */}
                    <button 
                      onClick={() => {
                        toggleTheme();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
                    >
                      {theme === 'dark' ? (
                        <>
                          <SunIcon className="w-5 h-5 mr-2" />
                          <span>Lichte modus</span>
                        </>
                      ) : (
                        <>
                          <MoonIcon className="w-5 h-5 mr-2" />
                          <span>Donkere modus</span>
                        </>
                      )}
                    </button>
                    
                    {/* Taal Wissel */}
                    <button 
                      onClick={() => {
                        toggleLanguage();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
                    >
                      <GlobeAltIcon className="w-5 h-5 mr-2" />
                      <span>Taal: {locale === 'nl' ? 'Nederlands' : 'Engels'}</span>
                    </button>
                    
                    {/* Uitloggen */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary text-red-500"
                    >
                      <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                      <span>Uitloggen</span>
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
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
} 