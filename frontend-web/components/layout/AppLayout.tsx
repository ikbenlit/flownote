'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../navigation/Sidebar';
import { Bars3Icon, MicrophoneIcon, PencilIcon } from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Schermformaat types voor betere responsiviteit
type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default function AppLayout({ children }: AppLayoutProps) {
  const [screenSize, setScreenSize] = useState<ScreenSize>('lg');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Hier zou de echte opnamefunctionaliteit komen
  };

  // Berekenen van de optimale padding en container grootte op basis van schermformaat
  const getContainerClasses = () => {
    switch (screenSize) {
      case 'xs':
        return 'p-3';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-5';
      case 'lg':
        return 'p-6';
      case 'xl':
      case '2xl':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  // Grote schermen krijgen extra ruimte voor het content panel
  const getContentMaxWidth = () => {
    switch (screenSize) {
      case 'xl':
        return 'max-w-7xl';
      case '2xl':
        return 'max-w-screen-2xl';
      default:
        return 'max-w-6xl';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
      {/* Sidebar met aangepaste breedte op basis van schermformaat */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-full
          ${screenSize === '2xl' ? 'w-72' : screenSize === 'xl' ? 'w-68' : 'w-64'}
          bg-gray-100 dark:bg-dark-bg-secondary
          border-r border-gray-200 dark:border-dark-border-primary
          transition-all duration-300 ease-in-out
          ${(isMobile || isTablet) ? (isSidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        <Sidebar />
      </aside>
      
      {/* Mobiele en Tablet Header */}
      {(isMobile || isTablet) && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border-primary z-40">
          <div className="flex items-center justify-between px-4 h-full">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg-tertiary"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold font-heading`}>FlowNote</h1>
            <button
              onClick={toggleRecording}
              className={`mic-button ${isRecording ? 'recording' : ''}`}
            >
              <MicrophoneIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>
      )}

      {/* Inhoud met aanpasbare padding en marges op basis van schermgrootte */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          ${(isMobile || isTablet) ? 'mt-16 ml-0' : screenSize === '2xl' ? 'ml-72' : screenSize === 'xl' ? 'ml-68' : 'ml-64'}
          ${getContainerClasses()}
        `}
      >
        {/* Notitie Editor Panel met responsieve padding */}
        <div className={`${getContentMaxWidth()} mx-auto`}>
          <div className="bg-white dark:bg-dark-bg-secondary rounded-lg shadow-sm border border-gray-200 dark:border-dark-border-primary p-4 sm:p-5 md:p-6 lg:p-8 mb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-xl font-medium font-heading mb-3 sm:mb-0">Notities</h2>
              <div className="flex space-x-3">
                <button className="p-2 bg-blue-light dark:bg-dark-accent-blue text-blue-dark dark:text-white rounded-lg">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={toggleRecording}
                  className={`mic-button ${isRecording ? 'recording' : ''} ${isMobile ? 'hidden' : 'flex'}`}
                >
                  <MicrophoneIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="px-1 sm:px-2 md:px-3">
              {children}
            </div>
          </div>
        </div>

        {/* AI Toolbox (floating) met aangepaste grootte voor verschillende schermen */}
        <div className={`
          fixed bottom-6 right-6 ai-toolbox 
          ${isMobile ? 'p-2.5 rounded-full' : 'p-3 rounded-full'} 
          ${screenSize === '2xl' ? 'p-4' : ''} 
          animate-float shadow-md hover:shadow-lg cursor-pointer
        `}>
          <svg className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} ${screenSize === '2xl' ? 'w-7 h-7' : ''} text-white`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm-2-8h-2V7h2v2z"></path>
          </svg>
        </div>
      </main>
    </div>
  );
} 