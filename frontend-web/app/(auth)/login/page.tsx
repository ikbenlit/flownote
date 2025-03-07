'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useI18n } from '@/context/I18nContext'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const { t } = useI18n()
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('redirect') || '/notes'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signInWithEmailAndPassword(email, password)
      router.push(redirectUrl)
    } catch (err) {
      console.error('Login error:', err)
      setError(t('auth.error.invalid_credentials'))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError(null)
    setLoading(true)

    try {
      await signInWithGoogle()
      router.push(redirectUrl)
    } catch (err: any) {
      console.error('Google login error:', err)
      // Specifieke error messages voor verschillende Firebase Auth errors
      if (err.code === 'auth/popup-closed-by-user') {
        setError(t('auth.error.google_popup_closed'))
      } else if (err.code === 'auth/popup-blocked') {
        setError(t('auth.error.google_popup_blocked'))
      } else if (err.code === 'auth/cancelled-popup-request') {
        setError(t('auth.error.google_popup_cancelled'))
      } else if (err.code === 'auth/network-request-failed') {
        setError(t('auth.error.network_error'))
      } else {
        setError(t('auth.error.google_login_failed'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg-primary">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-dark-text-primary font-architects-daughter">
            {t('auth.login_title')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-patrick-hand"
            >
              {loading ? t('auth.logging_in') : t('auth.login')}
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
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 dark:border-dark-border-primary rounded-md shadow-sm bg-white dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-primary hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-patrick-hand"
            >
              <FcGoogle className="w-5 h-5" />
              {t('auth.login_with_google')}
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-center">
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-patrick-hand"
            >
              {t('auth.no_account')}
            </Link>
            <Link
              href="/reset-password"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-patrick-hand"
            >
              {t('auth.forgot_password')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 