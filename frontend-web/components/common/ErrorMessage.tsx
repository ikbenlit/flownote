import React from 'react'

interface ErrorMessageProps {
  error: Error
  className?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className = '' }) => (
  <div className={`text-center py-12 ${className}`}>
    <p className="text-red-500">
      Er is een fout opgetreden: {error.message}
    </p>
  </div>
) 