'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

const navigation = [
  { name: 'Transcriptie', href: '/transcribe', icon: FaMicrophone },
  { name: 'Notities', href: '/notes', icon: FaStickyNote },
  { name: 'AI Generator', href: '/ai-generator', icon: FaRobot },
  { name: 'Taken', href: '/tasks', icon: FaTasks },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigatiebalk */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                FlowNote
              </Link>
              <div className="hidden md:flex space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaSignOutAlt className="w-5 h-5 mr-2" />
              Uitloggen
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main>{children}</main>
    </div>
  )
} 