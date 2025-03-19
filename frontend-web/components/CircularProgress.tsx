'use client'

import React from 'react'

interface CircularProgressProps {
  percentage: number
  size?: number
  color?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 32,
  color = '#3B82F6'
}) => {
  const radius = (size - 4) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="4"
        className="dark:stroke-gray-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-300 ease-in-out"
        strokeLinecap="round"
      />
    </svg>
  )
} 