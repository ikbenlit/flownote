import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: 'Inloggen - FlowNote',
  description: 'Log in op FlowNote om je notities en taken te beheren.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 