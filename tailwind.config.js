/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kufi: ['Noto Kufi Arabic', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#4CAF50',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
        },
        secondary: {
          light: '#FF9800',
          DEFAULT: '#EF6C00',
          dark: '#E65100',
        },
        accent: {
          light: '#64B5F6',
          DEFAULT: '#1976D2',
          dark: '#0D47A1',
        },
        success: '#388E3C',
        warning: '#FFA000',
        error: '#D32F2F',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in-right': 'slideInRight 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};