'use client'

import React, { useState } from 'react'
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
      setError(t('auth.error.passwords_dont_match'))
      return
    }

    setLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      window.location.href = '/app/dashboard'
    } catch (err: any) {
      console.error('Registration error:', err)
      if (err.code === 'auth/email-already-in-use') {
        setError(t('auth.error.email_in_use'))
      } else if (err.code === 'auth/weak-password') {
        setError(t('auth.error.weak_password'))
      } else if (err.code === 'auth/invalid-email') {
        setError(t('auth.error.invalid_email'))
      } else {
        setError(t('auth.error.registration_failed'))
      }
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setError(null)
    setLoading(true)

    try {
      await signInWithGoogle()
      window.location.href = '/app/dashboard'
    } catch (err: any) {
      console.error('Google registration error:', err)
      if (err.code === 'auth/popup-closed-by-user') {
        setError(t('auth.error.google_popup_closed'))
      } else if (err.code === 'auth/popup-blocked') {
        setError(t('auth.error.google_popup_blocked'))
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError(t('auth.error.google_popup_cancelled'))
      } else if (err.code === 'auth/network-request-failed') {
        setError(t('auth.error.network_error'))
      } else {
        setError(t('auth.error.google_registration_failed'))
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg-primary">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-dark-text-primary font-architects-daughter">
            {t('auth.register_title')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg text-sm font-patrick-hand">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-patrick-hand">
                {t('auth.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-secondary dark:text-dark-text-primary font-patrick-hand"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-patrick-hand">
                {t('auth.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-secondary dark:text-dark-text-primary font-patrick-hand"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary font-patrick-hand">
                {t('auth.confirm_password')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-dark-bg-secondary dark:text-dark-text-primary font-patrick-hand"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-patrick-hand"
            >
              {loading ? t('auth.registering') : t('auth.register')}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-dark-border-primary"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-bg-secondary text-gray-500 dark:text-dark-text-secondary font-patrick-hand">
                {t('auth.or')}
              </span>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm bg-white dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-patrick-hand"
            >
              <FcGoogle className="w-5 h-5" />
              {t('auth.register_with_google')}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-patrick-hand"
            >
              {t('auth.have_account')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 