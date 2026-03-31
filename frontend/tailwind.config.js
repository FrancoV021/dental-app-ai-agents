/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        primaryDark: '#0284c7',
        primaryLight: '#38bdf8',
      }
    },
  },
  plugins: [],
}
