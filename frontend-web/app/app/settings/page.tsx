'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import LanguageSwitcher from '@/components/settings/LanguageSwitcher';
import ThemeSwitcher from '@/components/settings/ThemeSwitcher';

export default function SettingsPage() {
  const { t } = useI18n();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('settings.title')}</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t('settings.appearance')}</h2>
          <ThemeSwitcher />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t('settings.language')}</h2>
          <LanguageSwitcher />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t('settings.notifications')}</h2>
          <div className="flex items-center justify-between">
            <span>{t('settings.push_notifications')}</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 