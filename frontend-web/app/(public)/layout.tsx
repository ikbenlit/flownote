import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'FlowNote - Verhoog je Productiviteit met AI',
  description: 'FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken.',
  robots: {
    index: true,
    follow: true,
  }
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 