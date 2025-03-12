'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/navigation/ThemeToggle';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CheckCircleIcon, 
  SparklesIcon, 
  MicrophoneIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick?: (() => void) | (() => Promise<void>);
}

const NavItem = ({ href, icon: Icon, label, isActive, onClick }: NavItemProps) => {
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
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={handleClick}
    >
      <Icon className="w-6 h-6" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (error) {
      console.error('Uitloggen mislukt:', error);
    }
  };

  const navigationItems = [
    { href: '/app/dashboard', icon: HomeIcon, label: 'Dashboard' },
    { href: '/app/notes', icon: DocumentTextIcon, label: 'Notities' },
    { href: '/app/tasks', icon: CheckCircleIcon, label: 'Taken' },
    { href: '/app/ai-generator', icon: SparklesIcon, label: 'AI Generator' },
    { href: '/app/transcribe', icon: MicrophoneIcon, label: 'Transcriptie' },
  ];

  const settingsItems = [
    { href: '/app/settings', icon: Cog6ToothIcon, label: 'Instellingen' },
    { href: '/app/profile', icon: UserCircleIcon, label: 'Profiel' },
    { onClick: handleLogout, href: '#', icon: ArrowLeftOnRectangleIcon, label: 'Uitloggen' },
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
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-white dark:bg-gray-900 
    transition-all duration-300 ease-in-out z-50
    ${isMobile 
      ? `${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`
      : `${isCollapsed ? 'w-20' : 'w-64'}`
    }
    border-r border-gray-200 dark:border-gray-700
  `;

  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity
    ${isMobile && isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
  `;

  return (
    <>
      <div className={overlayClasses} onClick={() => setIsOpen(false)} />
      <aside className={sidebarClasses}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && <h1 className="text-xl font-bold">FlowNote</h1>}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-6 h-6" />
              ) : (
                <ChevronLeftIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navigationItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={isRouteActive(item.href)}
                onClick={isMobile ? () => setIsOpen(false) : undefined}
              />
            ))}
          </nav>

          {/* Settings Navigation */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {/* Theme Toggle */}
            {!isCollapsed && <ThemeToggle />}
            
            {settingsItems.map((item) => (
              <NavItem
                key={item.href}
                {...item}
                isActive={isRouteActive(item.href)}
                onClick={
                  item.onClick 
                    ? () => {
                        if (isMobile) setIsOpen(false);
                        item.onClick?.();
                      }
                    : isMobile ? () => setIsOpen(false) : undefined
                }
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
} 