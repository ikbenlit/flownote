'use client'

import { useTheme } from '@/context/ThemeContext'
import { useI18n } from '@/context/I18nContext'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
      aria-label={isDark ? t('settings.theme_toggle_aria_label.to_light') : t('settings.theme_toggle_aria_label.to_dark')}
    >
      {isDark ? (
        <>
          <SunIcon className="w-6 h-6" />
          <span className="font-medium">{t('settings.light_mode')}</span>
        </>
      ) : (
        <>
          <MoonIcon className="w-6 h-6" />
          <span className="font-medium">{t('settings.dark_mode')}</span>
        </>
      )}
    </button>
  )
} 