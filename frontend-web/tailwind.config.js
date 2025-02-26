/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors (existing)
        primary: {
          blue: '#3B82F6',
          'blue-light': '#93C5FD',
          'blue-dark': '#2563EB',
          green: '#10B981',
          'green-light': '#D1FAE5',
          'green-dark': '#059669',
        },
        // Dark mode custom colors
        dark: {
          bg: {
            primary: '#1A1F2B',
            secondary: '#242937',
            tertiary: '#2D3341',
          },
          text: {
            primary: '#E2E8F0',
            secondary: '#94A3B8',
            accent: '#7DD3FC',
          },
          border: {
            primary: '#374151',
            secondary: '#4B5563',
          },
          accent: {
            blue: '#60A5FA',
            'blue-light': '#93C5FD',
            green: '#34D399',
            'green-light': '#6EE7B7',
          },
        },
      },
    },
  },
  plugins: [],
} 