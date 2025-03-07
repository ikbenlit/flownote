'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme moet binnen een ThemeProvider worden gebruikt')
  }
  return context
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Alleen op de client uitvoeren
  useEffect(() => {
    setMounted(true)
    
    // Haal het opgeslagen thema op uit localStorage of gebruik de systeem voorkeur
    const savedTheme = localStorage.getItem('flownote-theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setThemeState(initialTheme)
    
    // Pas het thema toe op het document
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('flownote-theme', newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Render niets tot het component is gemount om hydration mismatch te voorkomen
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
} 