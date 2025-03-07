'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

type AuthContextType = {
  currentUser: User | null
  loading: boolean
  signInWithEmailAndPassword: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()
      
      // Maak een sessie cookie aan
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      // Voeg extra configuratie toe
      provider.addScope('profile')
      provider.addScope('email')
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const userCredential = await signInWithPopup(auth, provider)
      const idToken = await userCredential.user.getIdToken()
      
      // Maak een sessie cookie aan
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Session creation failed:', errorData)
        throw new Error(errorData.error || 'Failed to create session')
      }

      const data = await response.json()
      if (data.status !== 'success') {
        throw new Error('Session creation failed')
      }
    } catch (error: any) {
      console.error('Google sign in error:', error)
      // Log specifieke Firebase Auth errors
      if (error.code) {
        console.error('Firebase Auth Error Code:', error.code)
      }
      throw error
    }
  }

  const signOut = async () => {
    try {
      await auth.signOut()
      // Verwijder de sessie cookie
      await fetch('/api/auth/session', {
        method: 'DELETE',
      })
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const value = {
    currentUser,
    loading,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 