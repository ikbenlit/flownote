import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/context/AuthContext'; // Pas pad aan
import { I18nProvider } from '@/context/I18nContext'; // Pas pad aan

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Inloggen - FlowNote',
  description: 'Log in op FlowNote om je notities en taken te beheren.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <I18nProvider>
          <AuthProvider>
            <div className="max-w-4xl mx-auto px-4 py-8">
              {children}
            </div>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}