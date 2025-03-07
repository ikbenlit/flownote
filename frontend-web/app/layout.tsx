import type { Metadata } from 'next'
import { Architects_Daughter, Patrick_Hand, Kalam } from 'next/font/google'
import { I18nProvider } from '@/context/I18nContext'
import { AuthProvider } from '@/context/AuthContext'
import { NoteProvider } from '@/context/NoteContext'
import '@/styles/globals.css'

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-architects-daughter',
})

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-patrick-hand',
})

const kalam = Kalam({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
})

export const metadata: Metadata = {
  title: 'FlowNote',
  description: 'Notities en taken met AI-ondersteuning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${architectsDaughter.variable} ${patrickHand.variable} ${kalam.variable}`}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <I18nProvider>
          <AuthProvider>
            <NoteProvider>
              {children}
            </NoteProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
} 