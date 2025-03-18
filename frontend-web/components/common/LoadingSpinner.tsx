import React from 'react'

interface LoadingSpinnerProps {
  fullScreen?: boolean
  className?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  fullScreen = false,
  className = ''
}) => (
  <div className={`flex justify-center ${fullScreen ? 'items-center min-h-screen' : 'py-12'} ${className}`}>
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
) 