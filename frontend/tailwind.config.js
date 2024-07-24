/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: "#000D3D",
        secondary: "#556578",
        tertiary: "#5F38FB",
        hoverBg: "#EFEBFF",
      },
    },
  },
  plugins: [],
}
