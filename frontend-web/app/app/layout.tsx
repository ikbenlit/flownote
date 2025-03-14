import type { Metadata } from 'next'
import AppLayoutClient from './AppLayoutClient'

// Metadata (server-side)
export const metadata: Metadata = {
  title: 'Dashboard - FlowNote',
  description: 'Bekijk je notities, taken en activiteiten in één overzicht.',
  robots: {
    index: false,
    follow: false,
  }
}

// Server Layout Component
export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayoutClient>{children}</AppLayoutClient>
} 