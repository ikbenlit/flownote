'use client';

import { useState } from 'react';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Taken</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Nieuwe Taak
          </button>

          <div className="p-4 border rounded-lg dark:border-gray-600">
            <p className="text-gray-600 dark:text-gray-300">
              Nog geen taken beschikbaar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 