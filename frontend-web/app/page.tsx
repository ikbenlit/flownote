'use client'

import Link from 'next/link'
import { FaMicrophone, FaStickyNote, FaRobot, FaTasks, FaArrowRight } from 'react-icons/fa'
import { useI18n } from '@/context/I18nContext'

export default function PublicHomePage() {
  const { t } = useI18n()

  const features = [
    {
      icon: <FaMicrophone className="text-blue-600 dark:text-blue-400 text-2xl" />,
      title: 'Transcriptie',
      description: 'Zet eenvoudig spraak om naar tekst met geavanceerde AI technologie. Perfect voor interviews, notities en meer.',
      link: '/transcribe',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: <FaStickyNote className="text-green-600 dark:text-green-400 text-2xl" />,
      title: 'Slimme Notities',
      description: 'Organiseer je gedachten met AI-ondersteunde notities. Automatische categorisering en slim zoeken.',
      link: '/notes',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: <FaRobot className="text-purple-600 dark:text-purple-400 text-2xl" />,
      title: 'AI Assistent',
      description: 'Laat AI je helpen bij het schrijven, samenvatten en analyseren van tekst. Verhoog je productiviteit.',
      link: '/ai-generator',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: <FaTasks className="text-orange-600 dark:text-orange-400 text-2xl" />,
      title: 'Slim Takenbeheer',
      description: 'Beheer je taken efficiënt met AI-suggesties voor prioriteiten en planning.',
      link: '/tasks',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Verhoog je Productiviteit met AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              FlowNote combineert notities, taken en AI om je werk slimmer en efficiënter te maken.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Gratis Starten
              </Link>
              <Link
                href="/auth/login"
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Inloggen
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Alles wat je nodig hebt in één app
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                <span className="inline-flex items-center text-blue-600 dark:text-blue-400">
                  Meer informatie <FaArrowRight className="ml-2" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Vertrouwd door professionals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "FlowNote heeft mijn werkproces compleet veranderd. De AI-functionaliteit bespaart me uren werk."
              </p>
              <p className="font-semibold">Sarah J. - Content Creator</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "De transcriptie functie is ongelooflijk nauwkeurig en snel. Perfect voor mijn interviews."
              </p>
              <p className="font-semibold">Mark P. - Journalist</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "Eindelijk een app die notities en taken slim combineert. De AI-suggesties zijn zeer waardevol."
              </p>
              <p className="font-semibold">Lisa M. - Project Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om productiever te worden?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Begin vandaag nog met FlowNote en ervaar hoe AI je werk naar een hoger niveau tilt.
          </p>
          <Link
            href="/auth/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-flex items-center transition-colors duration-200"
          >
            Start Gratis <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
} 