'use client'

import { useState } from 'react'
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useI18n } from '@/context/I18nContext'

export default function ResetPasswordPage() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err: any) {
      console.error('Password reset error:', err)
      if (err.code === 'auth/user-not-found') {
        setError('Geen account gevonden met dit e-mailadres')
      } else if (err.code === 'auth/invalid-email') {
        setError('Ongeldig e-mailadres')
      } else {
        setError('Er is een fout opgetreden bij het versturen van de reset e-mail')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-md mx-auto space-y-8 p-6 sm:p-8 bg-white dark:bg-dark-bg-secondary rounded-lg shadow-md border border-gray-200 dark:border-dark-border-primary">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text-primary font-heading">
            {t('auth.reset_password_title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary font-content">
            Voer je e-mailadres in om een wachtwoord reset link te ontvangen
          </p>
        </div>
        
        {success ? (
          <div className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 text-green-500 p-4 rounded-lg text-sm font-content">
              We hebben een e-mail verzonden met instructies om je wachtwoord te resetten. Controleer je inbox.
            </div>
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-content transition-colors"
              >
                Terug naar inloggen
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-6" onSubmit={handleResetPassword}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-3 rounded-lg text-sm font-content">
                {error}
              </div>
            )}
            
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
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-content transition-colors"
              >
                {loading ? 'Bezig met verzenden...' : t('auth.reset_password')}
              </button>
            </div>

            <div className="text-center text-sm">
              <Link 
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-content transition-colors"
              >
                Terug naar inloggen
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 