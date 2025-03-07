'use client'

import Link from 'next/link'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'

export default function HomePage() {
  const { t } = useI18n()

  const features = [
    {
      icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-2xl" />,
      title: 'Transcriptie',
      description: 'Zet spraak om naar tekst',
      link: '/transcribe',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: <FaStickyNote className="text-green-600 dark:text-green-400 text-2xl" />,
      title: 'Notities',
      description: 'Beheer je notities',
      link: '/notes',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: <FaRobot className="text-purple-600 dark:text-purple-400 text-2xl" />,
      title: 'AI Generator',
      description: 'Genereer tekst met AI',
      link: '/ai-generator',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: <FaTasks className="text-orange-600 dark:text-orange-400 text-2xl" />,
      title: 'Taken',
      description: 'Beheer je taken',
      link: '/tasks',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welkom bij FlowNote
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Kies een functie om mee te beginnen
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            href={feature.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-200"
          >
            <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
} 