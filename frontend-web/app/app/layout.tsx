import type { Metadata, Viewport } from 'next'
import Sidebar from '@/components/navigation/Sidebar'
import AuthGuard from '@/components/auth/AuthGuard'
import { NoteProvider } from '@/context/NoteContext'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
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
      <NoteProvider>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pl-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </NoteProvider>
    </AuthGuard>
  )
} 