/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        'dark-bg-primary': '#1a1b1e',
        'dark-bg-secondary': '#25262b',
        'dark-bg-tertiary': '#2c2e33',
        'dark-text-primary': '#c1c2c5',
        'dark-text-secondary': '#909296',
        'dark-border-primary': '#373A40',
        'dark-accent-blue': '#1971c2',
        'dark-accent-blue-light': '#228be6',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'app-title': ['28px', '1.2'],
        'h1': ['24px', '1.2'],
        'h2': ['20px', '1.3'],
        'h3': ['18px', '1.4'],
        'h4': ['16px', '1.4'],
        'body': ['16px', '1.6'],
        'ui': ['14px', '1.5'],
        'label': ['12px', '1.4'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 