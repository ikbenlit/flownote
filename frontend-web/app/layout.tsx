import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { I18nProvider } from '@/context/I18nContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '../styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'FlowNote - Verhoog je Productiviteit met AI',
  description: 'FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken.',
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1F2B' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary font-content">
        <I18nProvider>
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
} 