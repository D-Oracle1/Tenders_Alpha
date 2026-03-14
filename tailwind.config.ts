import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#042656',
          50: '#e6edf7',
          100: '#c0d1eb',
          200: '#96b2dd',
          300: '#6c93cf',
          400: '#4d7bc6',
          500: '#2e63bd',
          600: '#2958ae',
          700: '#224a99',
          800: '#1b3d84',
          900: '#042656',
        },
        accent: {
          DEFAULT: '#ac1f23',
          50: '#fde8e9',
          100: '#f9c5c6',
          200: '#f49fa0',
          300: '#ef797a',
          400: '#eb5d5f',
          500: '#e74143',
          600: '#d83b3d',
          700: '#c53336',
          800: '#b32b2e',
          900: '#ac1f23',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #042656 0%, #0a4299 100%)',
        'gradient-accent': 'linear-gradient(135deg, #ac1f23 0%, #e74143 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
