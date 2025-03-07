'use client'

import Link from 'next/link'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks, FaClock, FaChartLine } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'
import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { t } = useI18n()
  const { user } = useAuth()

  const quickActions = [
    {
      icon: <FaStickyNote className="text-green-600 dark:text-green-400 text-2xl" />,
      title: 'Nieuwe Notitie',
      description: 'Maak een nieuwe notitie',
      link: '/notes/new',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-2xl" />,
      title: 'Nieuwe Transcriptie',
      description: 'Start een nieuwe transcriptie',
      link: '/transcribe/new',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: <FaTasks className="text-orange-600 dark:text-orange-400 text-2xl" />,
      title: 'Nieuwe Taak',
      description: 'Voeg een nieuwe taak toe',
      link: '/tasks/new',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: <FaRobot className="text-purple-600 dark:text-purple-400 text-2xl" />,
      title: 'AI Assistent',
      description: 'Start een AI sessie',
      link: '/ai-generator',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welkom terug, {user?.displayName || 'Gebruiker'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Hier is een overzicht van je recente activiteiten en snelle acties.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            href={action.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-12 h-12 ${action.bgColor} rounded-full flex items-center justify-center mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
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
            <h2 className="text-xl font-semibold flex items-center">
              <FaClock className="mr-2 text-gray-500" /> Recente Activiteit
            </h2>
          </div>
          <div className="space-y-4">
            {/* Placeholder voor recente activiteiten */}
            <p className="text-gray-600 dark:text-gray-300">
              Nog geen recente activiteiten.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <FaChartLine className="mr-2 text-gray-500" /> Statistieken
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Notities</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Taken</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">Transcripties</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">AI Sessies</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 