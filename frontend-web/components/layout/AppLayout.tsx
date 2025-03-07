'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../navigation/Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-40">
          <div className="flex items-center justify-between px-4 h-full">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">FlowNote</h1>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        className={`
          transition-all duration-300 ease-in-out
          ${isMobile ? 'mt-16 ml-0' : 'ml-64'}
          p-6
        `}
      >
        {children}
      </main>
    </div>
  );
} 