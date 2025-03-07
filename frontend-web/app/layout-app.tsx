'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/navigation/Sidebar'

/**
 * RootAppLayout - Hoofdlayout voor de applicatie
 * 
 * Route Structuur:
 * /(public)/* - Publieke routes (landing page, etc.)
 *   - / - Landing page
 *   - /features - Feature overzicht
 *   - /pricing - Prijzen
 * 
 * /(auth)/* - Authenticatie routes
 *   - /login - Inloggen
 *   - /register - Registratie
 *   - /reset-password - Wachtwoord reset
 * 
 * /dashboard/* - Beveiligde app routes (vereist authenticatie)
 *   - / - Dashboard
 *   - /notes/* - Notities functionaliteit
 *   - /tasks/* - Taken functionaliteit
 *   - /transcribe/* - Transcriptie functionaliteit
 *   - /ai-generator/* - AI Generator functionaliteit
 */
export default function RootAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Check of we op een publieke of auth route zijn
  const isPublicRoute = pathname?.startsWith('/(public)')
  const isAuthRoute = pathname?.startsWith('/(auth)')
  
  // Als we op een publieke of auth route zijn, toon dan geen AppLayout
  if (isPublicRoute || isAuthRoute) {
    return children
  }

  // Voor alle andere routes, toon de app layout met sidebar
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
} 