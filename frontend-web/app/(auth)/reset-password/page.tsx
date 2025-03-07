'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/context/I18nContext'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function ResetPasswordPage() {
  const { t } = useI18n()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err: any) {
      console.error('Password reset error:', err)
      if (err.code === 'auth/user-not-found') {
        setError(t('auth.error.user_not_found'))
      } else if (err.code === 'auth/invalid-email') {
        setError(t('auth.error.invalid_email'))
      } else {
        setError(t('auth.error.reset_failed'))
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
            {t('auth.reset_password_title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-dark-text-secondary font-patrick-hand">
            {t('auth.reset_password_description')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg text-sm font-patrick-hand">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-500 p-3 rounded-lg text-sm font-patrick-hand">
              {t('auth.reset_password_success')}
            </div>
          )}
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
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-patrick-hand"
            >
              {loading ? t('auth.resetting_password') : t('auth.reset_password')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 