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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
} 