import React from 'react'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

interface EmptyStateProps {
  title: string
  description: string
  actionText: string
  actionHref: string
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  className = ''
}) => (
  <div className={`text-center py-12 ${className}`}>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-4">
      {description}
    </p>
    <Link
      href={actionHref}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <FaPlus className="mr-2" />
      {actionText}
    </Link>
  </div>
) 