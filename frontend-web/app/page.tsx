'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RootPage() {
  const router = useRouter()
  const { currentUser, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        router.replace('/dashboard')
      } else {
        router.replace('/(public)')
      }
    }
  }, [currentUser, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  )
} 