/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#070a12',
          800: '#0c121e',
          700: '#131c2e',
          600: '#1b2740',
          500: '#253454',
        },
        solar: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        grid: {
          cyan: '#06b6d4',
          emerald: '#10b981',
          rose: '#ef4444',
          amber: '#f97316',
          sky: '#38bdf8',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px rgba(6, 182, 212, 0.25)',
        'glow-amber': '0 0 25px rgba(245, 158, 11, 0.25)',
        'glow-rose': '0 0 25px rgba(239, 68, 68, 0.25)',
      },
    },
  },
  plugins: [],
}
