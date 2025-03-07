'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Instellingen</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow divide-y dark:divide-gray-700">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Weergave</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notificaties</h2>
          <div className="flex items-center justify-between">
            <span>Push Notificaties</span>
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