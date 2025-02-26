import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaMicrophone, FaRobot } from 'react-icons/fa';
import { ThemeToggle } from '../components/ThemeToggle';
import { LanguageSelector } from '../components/LanguageSelector';
import { SEO } from '../components/SEO';
import { useI18n } from '../context/I18nContext';

export const LandingPage: React.FC = () => {
  const { t } = useI18n();
  
  return (
    <>
      <SEO 
        title="FlowNote - Jouw Digitale Notitie Werkplaats"
        description="FlowNote is je persoonlijke digitale werkplaats voor het vastleggen en organiseren van gedachten. Met spraak-naar-tekst, AI-assistentie en een rustgevende interface."
        keywords={[
          'notities',
          'digitale werkplaats',
          'spraak naar tekst',
          'AI assistent',
          'productiviteit',
          'gedachten vastleggen',
          'ideëen organiseren',
          'notitie app'
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-dark-bg-primary dark:to-dark-bg-secondary transition-colors duration-200">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
        
        {/* Hero Section */}
        <header className="container mx-auto px-4 py-16 md:py-24">
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h1 className="font-architects-daughter text-5xl md:text-6xl text-gray-900 dark:text-dark-text-primary mb-6">
                {t('landing.hero.title')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-4">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/app"
                  className="inline-block font-caveat text-xl px-8 py-4 bg-blue-500 dark:bg-dark-accent-blue hover:bg-blue-600 dark:hover:bg-dark-accent-blue-light text-white rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
                  itemProp="mainEntityOfPage"
                >
                  {t('landing.cta.start')}
                </Link>
                <Link
                  to="/demo"
                  className="inline-block font-caveat text-xl px-8 py-4 bg-green-500 dark:bg-dark-accent-green hover:bg-green-600 dark:hover:bg-dark-accent-green-light text-white rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {t('landing.cta.demo')}
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-16 px-4" aria-label="Features">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <article className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-dark-border-primary">
              <div className="w-16 h-16 bg-green-100 dark:bg-dark-bg-tertiary rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaPencilAlt className="text-green-600 dark:text-dark-accent-green text-2xl" />
              </div>
              <h2 className="font-caveat text-2xl text-gray-900 dark:text-dark-text-primary mb-4 text-center">
                {t('landing.feature.writing.title')}
              </h2>
              <p className="font-inter text-gray-700 dark:text-dark-text-secondary text-center">
                {t('landing.feature.writing.description')}
              </p>
            </article>

            {/* Feature 2 */}
            <article className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-dark-border-primary">
              <div className="w-16 h-16 bg-blue-100 dark:bg-dark-bg-tertiary rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaMicrophone className="text-blue-600 dark:text-dark-accent-blue text-2xl" />
              </div>
              <h2 className="font-caveat text-2xl text-gray-900 dark:text-dark-text-primary mb-4 text-center">
                {t('landing.feature.speech.title')}
              </h2>
              <p className="font-inter text-gray-700 dark:text-dark-text-secondary text-center">
                {t('landing.feature.speech.description')}
              </p>
            </article>

            {/* Feature 3 */}
            <article className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-dark-border-primary">
              <div className="w-16 h-16 bg-green-100 dark:bg-dark-bg-tertiary rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaRobot className="text-green-600 dark:text-dark-accent-green text-2xl" />
              </div>
              <h2 className="font-caveat text-2xl text-gray-900 dark:text-dark-text-primary mb-4 text-center">
                {t('landing.feature.ai.title')}
              </h2>
              <p className="font-inter text-gray-700 dark:text-dark-text-secondary text-center">
                {t('landing.feature.ai.description')}
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 mb-16" aria-label="Registratie">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-blue-500 dark:from-dark-accent-green dark:to-dark-accent-blue rounded-2xl p-12 text-center text-white shadow-xl">
            <h2 className="font-architects-daughter text-4xl mb-6">
              {t('landing.cta.section.title')}
            </h2>
            <p className="font-patrick-hand text-xl mb-8">
              {t('landing.cta.section.subtitle')}
            </p>
            <Link
              to="/register"
              className="inline-block font-caveat text-xl px-8 py-4 bg-white text-blue-600 dark:text-dark-accent-blue rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {t('landing.cta.register')}
            </Link>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center mb-12">{t('landing.social.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial cards */}
              <div className="bg-gray-50 p-6 rounded-lg">
                {/* Testimonial content */}
              </div>
              {/* ... meer testimonials ... */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-dark-bg-secondary py-8 transition-colors duration-200" role="contentinfo">
          <div className="container mx-auto px-4 text-center">
            <p className="font-inter text-gray-600 dark:text-dark-text-secondary">
              © {new Date().getFullYear()} FlowNote. {t('app.copyright')}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}; 