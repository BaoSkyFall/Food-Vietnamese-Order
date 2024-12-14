/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'spicy-pulse': 'spicy-pulse 2s infinite',
      },
      keyframes: {
        'spicy-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      colors: {
        'menu-amber': {
          50: '#FDF8F3',
          100: '#F9E8D4',
          200: '#F5D0A9',
          300: '#E1A96E',
          400: '#C17F3E',
          500: '#A66321',
          600: '#8B4D1A',
          700: '#723D16',
          800: '#5A2E12',
          900: '#42210D',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}