'use client'

import { useState, useEffect } from 'react'
import { NoteProvider } from '@/context/NoteContext'
import { TaskProvider } from '@/context/TaskContext'
import Sidebar from '@/components/navigation/Sidebar'
import AuthGuard from '@/components/auth/AuthGuard'
import { ThemeProvider } from '@/context/ThemeContext'

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  // State voor schermformaat
  const [isMobileView, setIsMobileView] = useState(false)
  const [isTabletView, setIsTabletView] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  // Detecteer schermformaat
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setIsMobileView(width < 640)
      setIsTabletView(width >= 640 && width < 1024)
    }
    
    // Check bij eerste render
    checkScreenSize()
    
    // Luister naar resize events
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <AuthGuard>
      <NoteProvider>
        <TaskProvider>
          <ThemeProvider>
            <div className="flex min-h-screen">
              <Sidebar onCollapseChange={setIsSidebarCollapsed} />
              <main className={`
                flex-1 bg-gray-50 dark:bg-dark-bg-primary
                ${isMobileView || isTabletView 
                  ? 'ml-16' 
                  : isSidebarCollapsed 
                    ? 'ml-16' 
                    : 'ml-64'
                } 
                transition-all duration-300
              `}>
                <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8
                  max-w-full sm:max-w-full md:max-w-6xl lg:max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl"
                >
                  <div className="bg-white dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-primary shadow-sm">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </ThemeProvider>
        </TaskProvider>
      </NoteProvider>
    </AuthGuard>
  )
}