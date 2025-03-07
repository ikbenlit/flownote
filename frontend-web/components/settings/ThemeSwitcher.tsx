'use client'

import { useTheme } from '@/context/ThemeContext'
import { useI18n } from '@/context/I18nContext'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <div className="flex items-center justify-between">
      <span>{t('settings.dark_mode')}</span>
      <button
        onClick={toggleTheme}
        className={`${
          isDark ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        aria-label={isDark ? t('settings.theme_toggle_aria_label.to_light') : t('settings.theme_toggle_aria_label.to_dark')}
      >
        <span
          className={`${
            isDark ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform flex items-center justify-center overflow-hidden`}
        >
          {isDark ? (
            <MoonIcon className="h-3 w-3 text-blue-600" />
          ) : (
            <SunIcon className="h-3 w-3 text-yellow-500" />
          )}
        </span>
      </button>
    </div>
  )
} 