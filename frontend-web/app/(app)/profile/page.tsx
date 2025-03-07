'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profiel</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-600 dark:text-gray-300">
                {currentUser?.email?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold">{currentUser?.email || 'Gebruiker'}</h2>
              <p className="text-gray-600 dark:text-gray-300">Lid sinds {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="pt-6 border-t dark:border-gray-700">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Profiel Bewerken
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 