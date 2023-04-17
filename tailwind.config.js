/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: "#fafafa",
        dark: "#171717",
        brand: {
          50: "#fff6fa",
          100: "#ffedf5",
          200: "#ffd3e5",
          300: "#ffb8d5",
          400: "#fe82b6",
          500: "#fe4d97",
          600: "#e54588",
          700: "#bf3a71",
          800: "#982e5b",
          900: "#7c264a",
          DEFAULT: "#fe4d97",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
