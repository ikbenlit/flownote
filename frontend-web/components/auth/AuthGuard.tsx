'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

const publicPaths = ['/', '/login', '/register', '/reset-password', '/features']

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      const isPublicPath = publicPaths.some(path => pathname === path)

      if (!currentUser && !isPublicPath) {
        // Geen gebruiker en geen publieke route: redirect naar login
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      } else if (currentUser && (pathname === '/login' || pathname === '/register')) {
        // Ingelogde gebruiker op login/register pagina: redirect naar notes
        router.push('/notes')
      }
    }
  }, [currentUser, loading, pathname, router])

  // Toon niets tijdens het laden of redirecten
  if (loading) {
    return null
  }

  return <>{children}</>
} 