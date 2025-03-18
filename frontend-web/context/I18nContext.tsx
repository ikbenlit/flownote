'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import nl from '@/locales/nl';
import en from '@/locales/en';

// Debug-log om te controleren of de vertalingen correct geladen zijn
console.log('nlTranslations loaded:', nl);
console.log('enTranslations loaded:', en);

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never
    }[keyof T]
  : never;

type TranslationPath = NestedKeyOf<typeof nl>;

type Locale = 'nl' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Beschikbare vertalingen
const translations = {
  nl,
  en,
};

// Debug-log om te controleren of translations correct is gevuld
console.log('Translations object:', translations);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n moet binnen een I18nProvider worden gebruikt');
  }
  return context;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('nl');

  useEffect(() => {
    const savedLocale = localStorage.getItem('flownote-locale');
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocale(savedLocale as Locale);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (Object.keys(translations).includes(browserLang)) {
        setLocale(browserLang as Locale);
        localStorage.setItem('flownote-locale', browserLang);
      }
    }
    console.log('Current locale set to:', locale);
    document.documentElement.lang = locale;
  }, [Object.keys(translations), locale]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }

    return value;
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}