import type { Metadata } from 'next'
import { Architects_Daughter, Patrick_Hand, Kalam } from 'next/font/google'
import { I18nProvider } from '@/context/I18nContext'
import { AuthProvider } from '@/context/AuthContext'
import { NoteProvider } from '@/context/NoteContext'
import AuthGuard from '@/components/auth/AuthGuard'
import RootAppLayout from './layout-app'
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
  title: 'FlowNote - Verhoog je Productiviteit met AI',
  description: 'FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken. Transcriptie, slimme notities en taakbeheer in één app.',
  keywords: 'AI notities, taakbeheer, transcriptie, productiviteit, workflow, notitie app, taken app',
  authors: [{ name: 'FlowNote Team' }],
  openGraph: {
    title: 'FlowNote - Verhoog je Productiviteit met AI',
    description: 'FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken.',
    type: 'website',
    locale: 'nl_NL',
    siteName: 'FlowNote',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowNote - Verhoog je Productiviteit met AI',
    description: 'FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
            <AuthGuard>
              <NoteProvider>
                <RootAppLayout>{children}</RootAppLayout>
              </NoteProvider>
            </AuthGuard>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
} 