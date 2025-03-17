'use client'

import Link from 'next/link'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks, FaClock, FaChartLine } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { t } = useI18n()
  const { currentUser } = useAuth()

  const quickActions = [
    {
      icon: <FaStickyNote className="text-green-600 dark:text-green-400 w-6 h-6" />,
      title: 'Nieuwe Notitie',
      description: 'Maak een nieuwe notitie',
      link: '/dashboard/notes/new',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 w-6 h-6" />,
      title: 'Nieuwe Transcriptie',
      description: 'Start een nieuwe transcriptie',
      link: '/dashboard/transcribe/new',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: <FaTasks className="text-orange-600 dark:text-orange-400 w-6 h-6" />,
      title: 'Nieuwe Taak',
      description: 'Voeg een nieuwe taak toe',
      link: '/dashboard/tasks/new',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: <FaRobot className="text-purple-600 dark:text-purple-400 w-6 h-6" />,
      title: 'AI Assistent',
      description: 'Start een AI sessie',
      link: '/dashboard/ai-generator',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Welkom terug, {currentUser?.displayName || 'Gebruiker'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Hier is een overzicht van je recente activiteiten en snelle acties.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.link}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6"
          >
            <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {action.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100">
              <FaClock className="w-5 h-5 mr-2 text-gray-500" /> Recente Activiteit
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Nog geen recente activiteiten.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100">
              <FaChartLine className="w-5 h-5 mr-2 text-gray-500" /> Statistieken
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Notities</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Taken</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Transcripties</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">AI Sessies</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 