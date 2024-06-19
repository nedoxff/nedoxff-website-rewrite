const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "rgb(var(--color-dark) / <alpha-value>)",
      },
      fontFamily: {
        body: ["ClashGrotesk-Variable", ...defaultTheme.fontFamily.sans],
        title: ["ClashDisplay-Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
