'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import nlTranslations, { TranslationKey } from '../locales/nl'
import enTranslations from '../locales/en'

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

type TranslationPath = NestedKeyOf<typeof nlTranslations>

interface I18nContextType {
  t: (key: TranslationPath, ...args: any[]) => string
  locale: string
  setLocale: (locale: string) => void
  availableLocales: string[]
}

const I18nContext = createContext<I18nContextType | null>(null)

// Beschikbare vertalingen
const translations: Record<string, any> = {
  nl: nlTranslations,
  en: enTranslations,
  // Voeg hier andere talen toe wanneer beschikbaar
}

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n moet binnen een I18nProvider worden gebruikt')
  }
  return context
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Haal de opgeslagen taal op uit localStorage of gebruik nl als standaard
  const [locale, setLocaleState] = useState('nl')
  const availableLocales = Object.keys(translations)

  useEffect(() => {
    // Haal de opgeslagen taal op uit localStorage bij het laden
    const savedLocale = localStorage.getItem('flownote-locale')
    if (savedLocale && availableLocales.includes(savedLocale)) {
      setLocaleState(savedLocale)
    } else {
      // Als er geen opgeslagen taal is, probeer de browser taal te gebruiken
      const browserLang = navigator.language.split('-')[0]
      if (availableLocales.includes(browserLang)) {
        setLocaleState(browserLang)
        localStorage.setItem('flownote-locale', browserLang)
      }
    }
    // Update de html lang attribuut
    document.documentElement.lang = locale
  }, [availableLocales, locale])

  const setLocale = (newLocale: string) => {
    if (availableLocales.includes(newLocale)) {
      setLocaleState(newLocale)
      // Sla de taal op in localStorage
      localStorage.setItem('flownote-locale', newLocale)
      // Update de html lang attribuut
      document.documentElement.lang = newLocale
    }
  }

  const getNestedValue = (obj: any, path: string): string => {
    const keys = path.split('.')
    let value: any = obj

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key]
      } else {
        return path
      }
    }

    return typeof value === 'string' ? value : path
  }

  const t = (key: TranslationPath, ...args: any[]): string => {
    // Gebruik de huidige taal of val terug op Nederlands
    const currentTranslations = translations[locale] || nlTranslations
    const translation = getNestedValue(currentTranslations, key)

    if (args.length === 0) {
      return translation
    }

    return translation.replace(/{(\d+)}/g, (match: string, index: string) => {
      const argIndex = parseInt(index, 10)
      return args[argIndex]?.toString() || match
    })
  }

  return (
    <I18nContext.Provider value={{ t, locale, setLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  )
} 