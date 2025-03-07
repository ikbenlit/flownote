'use client'

import Link from 'next/link'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Welkom bij FlowNote
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Jouw alles-in-één oplossing voor notities, transcripties en taakbeheer met AI-ondersteuning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-3xl" />,
              title: 'Transcriptie',
              description: 'Zet spraak om naar tekst met geavanceerde AI-technologie'
            },
            {
              icon: <FaStickyNote className="text-green-600 dark:text-green-400 text-3xl" />,
              title: 'Notities',
              description: 'Organiseer je gedachten met krachtige notitie-tools'
            },
            {
              icon: <FaRobot className="text-purple-600 dark:text-purple-400 text-3xl" />,
              title: 'AI Generator',
              description: 'Genereer ideeën en content met AI-assistentie'
            },
            {
              icon: <FaTasks className="text-orange-600 dark:text-orange-400 text-3xl" />,
              title: 'Taken',
              description: 'Beheer je taken en blijf productief'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 dark:bg-gray-700 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Begin nu
          </Link>
        </div>
      </div>
    </div>
  )
} 