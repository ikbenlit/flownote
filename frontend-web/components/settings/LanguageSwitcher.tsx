'use client'

import { useI18n } from '@/context/I18nContext'

// Taal namen mapping
const localeNames: Record<string, Record<string, string>> = {
  nl: {
    nl: 'Nederlands',
    en: 'Engels',
  },
  en: {
    nl: 'Dutch',
    en: 'English',
  }
  // Voeg hier andere talen toe wanneer beschikbaar
}

export default function LanguageSwitcher() {
  const { locale, setLocale, availableLocales, t } = useI18n()

  // Haal de taalnamen op in de huidige taal
  const getLocalizedName = (localeCode: string) => {
    // Als de huidige taal beschikbaar is in de mapping, gebruik die
    if (localeNames[locale] && localeNames[locale][localeCode]) {
      return localeNames[locale][localeCode]
    }
    // Anders val terug op de Engelse naam of de code zelf
    return localeNames.en?.[localeCode] || localeCode
  }

  return (
    <div className="flex items-center justify-between">
      <span>{t('settings.language')}</span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-blue dark:focus:ring-dark-accent-blue"
      >
        {availableLocales.map((localeCode) => (
          <option key={localeCode} value={localeCode}>
            {getLocalizedName(localeCode)}
          </option>
        ))}
      </select>
    </div>
  )
} 