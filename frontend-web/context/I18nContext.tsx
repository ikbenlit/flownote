'use client'

import React, { createContext, useContext, useState } from 'react'
import translations, { TranslationKey } from '../locales/nl'

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

type TranslationPath = NestedKeyOf<typeof translations>

interface I18nContextType {
  t: (key: TranslationPath, ...args: any[]) => string
  locale: string
  setLocale: (locale: string) => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export const useI18n = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n moet binnen een I18nProvider worden gebruikt')
  }
  return context
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale] = useState('nl')

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
    const translation = getNestedValue(translations, key)

    if (args.length === 0) {
      return translation
    }

    return translation.replace(/{(\d+)}/g, (match: string, index: string) => {
      const argIndex = parseInt(index, 10)
      return args[argIndex]?.toString() || match
    })
  }

  return (
    <I18nContext.Provider value={{ t, locale, setLocale: () => {} }}>
      {children}
    </I18nContext.Provider>
  )
} 