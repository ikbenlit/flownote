'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const publicPaths = ['/', '/auth/login', '/auth/register', '/auth/reset-password']

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (!loading) {
      const isPublicPath = publicPaths.some(path => pathname === path)

      if (!currentUser && !isPublicPath) {
        // Geen gebruiker en geen publieke route: redirect naar login
        router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`)
      } else if (currentUser && (pathname === '/auth/login' || pathname === '/auth/register')) {
        // Ingelogde gebruiker op login/register pagina: redirect naar dashboard
        router.push('/app/dashboard')
      } else {
        // Auth check is voltooid en geen redirects nodig
        setAuthChecked(true)
      }
    }
  }, [currentUser, loading, pathname, router])

  // Toon een loading indicator tijdens het laden of redirecten
  if (loading || !authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  return <>{children}</>
} 