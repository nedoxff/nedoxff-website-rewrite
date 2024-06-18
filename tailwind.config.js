const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
      },
      fontFamily: {
        body: ['InterVariable', ...defaultTheme.fontFamily.sans],
        title: ['Anybody', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}