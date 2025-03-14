'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import nlTranslations, { TranslationKey } from '../locales/nl';
import enTranslations from '../locales/en';

// Debug-log om te controleren of de vertalingen correct geladen zijn
console.log('nlTranslations loaded:', nlTranslations);
console.log('enTranslations loaded:', enTranslations);

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never
    }[keyof T]
  : never;

type TranslationPath = NestedKeyOf<typeof nlTranslations>;

interface I18nContextType {
  t: (key: TranslationPath, ...args: any[]) => string;
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
}

const I18nContext = createContext<I18nContextType | null>(null);

// Beschikbare vertalingen
const translations: Record<string, any> = {
  nl: nlTranslations,
  en: enTranslations,
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

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState('nl');
  const availableLocales = Object.keys(translations);

  useEffect(() => {
    const savedLocale = localStorage.getItem('flownote-locale');
    if (savedLocale && availableLocales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      const browserLang = navigator.language.split('-')[0];
      if (availableLocales.includes(browserLang)) {
        setLocaleState(browserLang);
        localStorage.setItem('flownote-locale', browserLang);
      }
    }
    console.log('Current locale set to:', locale);
    document.documentElement.lang = locale;
  }, [availableLocales, locale]);

  const setLocale = (newLocale: string) => {
    if (availableLocales.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('flownote-locale', newLocale);
      document.documentElement.lang = newLocale;
      console.log('Locale switched to:', newLocale);
    }
  };

  const getNestedValue = (obj: any, path: string): string => {
    const keys = path.split('.');
    let value: any = obj;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`Translation not found for key: ${path} in locale: ${locale}`);
        return path; // Fallback naar de sleutel
      }
    }

    return typeof value === 'string' ? value : path;
  };

  const t = (key: TranslationPath, ...args: any[]): string => {
    const currentTranslations = translations[locale] || nlTranslations;
    console.log(`Translating key: ${key} with locale: ${locale}`);
    console.log('Current translations:', currentTranslations);
    const translation = getNestedValue(currentTranslations, key);
    console.log('Translation result:', translation);

    if (args.length === 0) {
      return translation;
    }

    return translation.replace(/{(\d+)}/g, (match: string, index: string) => {
      const argIndex = parseInt(index, 10);
      return args[argIndex]?.toString() || match;
    });
  };

  return (
    <I18nContext.Provider value={{ t, locale, setLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  );
};