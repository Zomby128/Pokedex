/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pokedex-red': '#dc0a2d',
        'pokedex-dark-red': '#b30725',
        'pokedex-blue': '#30a7d7',
        'pokedex-yellow': '#ffcb05',
        'pokedex-gray': '#f2f2f2',
        'pokedex-dark-gray': '#a4a4a4',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'gameboy': ['"VT323"', 'monospace'],
      }
    },
  },
  plugins: [],
}