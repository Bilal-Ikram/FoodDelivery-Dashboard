/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Define Roboto as a custom font family
      },
      fontWeight: {
        light: 300, // Roboto Light
        regular: 400, // Roboto Regular
        bold: 700, // Roboto Bold
        black: 900, // Roboto Black
      },
    },
  },
  plugins: [],
}

