import React from 'react'
import { Search } from 'lucide-react'

interface NotesSearchProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export const NotesSearch: React.FC<NotesSearchProps> = ({ 
  value, 
  onChange,
  className = ''
}) => (
  <div className={`relative flex-1 ${className}`}>
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder="Zoek notities..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
    />
  </div>
) 