/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Sans MS"', '"Comic Neue"', 'cursive', 'sans-serif'],
        papyrus: ['Papyrus', 'fantasy', 'cursive'],
        impact: ['Impact', 'Haettenschweiler', 'sans-serif'],
      },
      animation: {
        'wiggle': 'wiggle 0.2s ease-in-out infinite',
        'slow-spin': 'spin 20s linear infinite',
        'flash': 'flash 0.5s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        }
      }
    },
  },
  plugins: [],
}
