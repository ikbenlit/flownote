import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true
}

export const metadata: Metadata = {
  title: 'Dashboard - FlowNote',
  description: 'Bekijk je notities, taken en activiteiten in één overzicht.',
  robots: {
    index: false,
    follow: false,
  }
}

import AppLayoutClient from './AppLayoutClient'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayoutClient>{children}</AppLayoutClient>
} 