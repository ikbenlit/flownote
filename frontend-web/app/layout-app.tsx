'use client'

import AppLayout from '@/components/layout/AppLayout'
import { usePathname } from 'next/navigation'

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
    return <>{children}</>
  }

  // Voor alle andere (beveiligde) routes, gebruik AppLayout met Sidebar
  return <AppLayout>{children}</AppLayout>
} 