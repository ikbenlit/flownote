'use client';

import { useState } from 'react';
import { useI18n } from '@/context/I18nContext';

export default function TasksPage() {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('tasks.title')}</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {t('tasks.add')}
          </button>

          <div className="p-4 border rounded-lg dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300">
              {t('tasks.no_tasks')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 