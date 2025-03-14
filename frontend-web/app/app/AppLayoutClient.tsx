'use client'

import { NoteProvider } from '@/context/NoteContext'
import { TaskProvider } from '@/context/TaskContext'
import Sidebar from '@/components/navigation/Sidebar'
import { ThemeProvider } from '@/context/ThemeContext'

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NoteProvider>
      <TaskProvider>
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-50 dark:bg-dark-bg-primary">
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
  )
} 