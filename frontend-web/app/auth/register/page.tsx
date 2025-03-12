'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useI18n } from '@/context/I18nContext'
import { FcGoogle } from 'react-icons/fc'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function RegisterPage() {
  const { t } = useI18n()
  const { signInWithGoogle } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Wachtwoorden komen niet overeen')
      return
    }

    if (password.length < 6) {
      setError('Wachtwoord moet minimaal 6 tekens bevatten')
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/app/dashboard')
    } catch (err: any) {
      console.error('Register error:', err)
      // Laat de gebruiker een specifieke foutmelding zien op basis van de error code
      if (err.code === 'auth/email-already-in-use') {
        setError('Dit e-mailadres is al in gebruik')
      } else if (err.code === 'auth/invalid-email') {
        setError('Ongeldig e-mailadres')
      } else if (err.code === 'auth/weak-password') {
        setError('Wachtwoord is te zwak')
      } else {
        setError('Registratie mislukt. Probeer het later opnieuw.')
      }
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError(null)
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push('/app/dashboard')
    } catch (err: any) {
      console.error('Google signup error:', err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError(t('auth.error.google_popup_closed'))
      } else if (err.code === 'auth/popup-blocked') {
        setError(t('auth.error.google_popup_blocked'))
      } else {
        setError('Google registratie mislukt')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-md mx-auto space-y-8 p-6 sm:p-8 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md border border-gray-200 dark:border-dark-border-primary">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text-primary font-heading">
            {t('auth.register_title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary font-content">
            Maak je FlowNote account aan
          </p>
        </div>
        
        <form className="mt-6 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg text-sm font-content">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-content">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-tertiary dark:text-dark-text-primary font-content text-base"
                placeholder="email@voorbeeld.nl"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-content">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-tertiary dark:text-dark-text-primary font-content text-base"
                placeholder="••••••••"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-dark-text-secondary font-content">
                Minimaal 6 tekens
              </p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-content">
                {t('auth.confirm_password')}
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-tertiary dark:text-dark-text-primary font-content text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-content transition-colors"
            >
              {loading ? t('auth.registering') : t('auth.register')}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-dark-border-primary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-bg-secondary text-gray-500 dark:text-dark-text-secondary font-content">
                {t('auth.or')}
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm bg-white dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-content transition-colors"
            >
              <FcGoogle className="w-5 h-5" />
              {t('auth.register_with_google')}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-content transition-colors"
            >
              Heb je al een account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 