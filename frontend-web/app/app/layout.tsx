import type { Metadata, Viewport } from 'next'
import Sidebar from '@/components/navigation/Sidebar'
import AuthGuard from '@/components/auth/AuthGuard'
import { NoteProvider } from '@/context/NoteContext'
import { ThemeProvider } from '@/context/ThemeContext'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true
}

export const metadata: Metadata = {
  title: 'Dashboard - FlowNote',
  description: 'Bekijk je notities, taken en activiteiten in één overzicht.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <ThemeProvider>
        <NoteProvider>
          <div className="flex h-screen bg-gray-50 dark:bg-dark-bg-primary">
            <Sidebar />
            <main className="flex-1 overflow-y-auto 
              md:pl-64 lg:pl-64 xl:pl-68 2xl:pl-72 
              transition-all duration-300 ease-in-out"
            >
              <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6 lg:py-8
                max-w-full sm:max-w-full md:max-w-6xl lg:max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl"
              >
                <div className="bg-white dark:bg-dark-bg-secondary rounded-lg border border-gray-200 dark:border-dark-border-primary shadow-sm">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </NoteProvider>
      </ThemeProvider>
    </AuthGuard>
  )
} 