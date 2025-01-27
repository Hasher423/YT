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
        'custom-black': '#0f0f0f',
      },
      fontFamily: {
        'youtube': ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}