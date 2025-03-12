import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { I18nProvider } from '@/context/I18nContext';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1.5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Inloggen - FlowNote',
  description: 'Log in op FlowNote om je notities en taken te beheren.',
  robots: {
    index: false,
    follow: false,
  },
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=yes',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1F2B' },
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.5, user-scalable=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary font-content">
        <I18nProvider>
          <ThemeProvider>
            <AuthProvider>
              <div className="max-w-full xs:max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 
                mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {children}
              </div>
            </AuthProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}