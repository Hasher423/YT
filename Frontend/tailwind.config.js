/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom': '0 4px 6px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        'custom-white': '#ffffff',
        'custom-black': '#181818',
      },
      fontFamily: {
        youtube: ['Roboto', 'Arial', 'sans-serif'],
        playWrite: ['PlayWrite', 'sans-serif'],
        bebasNeue: ['BebasNeue', 'sans-serif'],
        robotoCustom: ['Roboto', 'sans-serif'], // Your TTF-based Roboto
      },
      screens: {
        'lt-sm': { max: '639px' },
        '530-780': {'raw': '(min-width: 530px) and (max-width: 780px)'},
      },
    },
  },
  plugins: [],
}
