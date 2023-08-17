/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ubuntuGray: '#3e3d39',
        ubuntuOrange: '#e95420',
        ubuntuPurple: '#2d0a22',
        ubuntuGreen: '#72d233',
        ubuntuBlue: '#6f9ac9',
      }
    },
  },
  plugins: [],
}

