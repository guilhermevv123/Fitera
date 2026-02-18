/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6A00',
          dark: '#E85C00',
          light: '#FF8533'
        },
        surface: '#F7F7F8',
        success: '#22C55E',
        warning: '#F59E0B',
        text: {
          primary: '#111827',
          secondary: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(255, 106, 0, 0.15)',
        'glow': '0 0 15px rgba(255, 106, 0, 0.4)',
        'card': '0 2px 8px rgba(0,0,0,0.04)',
        'float': '0 8px 16px rgba(0,0,0,0.08)'
      }
    },
  },
  plugins: [],
}

