/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px', // Extra small devices
      },
      width: {
        '68': '17rem', // Voor de xl sidebar
      },
      colors: {
        // Light mode kleuren
        blue: {
          light: '#93C5FD',  // Blauw Licht
          DEFAULT: '#3B82F6', // Blauw Primair
          dark: '#2563EB',    // Blauw Donker
        },
        green: {
          light: '#D1FAE5',   // Groen Licht
          DEFAULT: '#10B981', // Groen Primair 
          dark: '#059669',    // Groen Donker
        },
        // Neutrale kleuren
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          800: '#1F2937',
          900: '#111827',
        },
        // Dark mode kleuren
        dark: {
          'bg-primary': '#1A1F2B',
          'bg-secondary': '#242937',
          'bg-tertiary': '#2D3341',
          'text-primary': '#E2E8F0',
          'text-secondary': '#94A3B8',
          'text-accent': '#7DD3FC',
          'border-primary': '#374151',
          'border-secondary': '#4B5563',
          'accent-blue': '#60A5FA',
          'accent-blue-light': '#93C5FD',
          'accent-green': '#34D399',
          'accent-green-light': '#6EE7B7',
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
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        content: ['Inter', 'system-ui', 'sans-serif'],
        'architects-daughter': ['Architects Daughter', 'cursive'],
        'patrick-hand': ['Patrick Hand', 'cursive'],
        'caveat': ['Caveat', 'cursive'],
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
          },
        },
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'sketch': '2px 2px 0px rgba(0, 0, 0, 0.1)',
        'sketch-hover': '3px 3px 0px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 