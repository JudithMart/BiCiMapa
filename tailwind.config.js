/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        primary: '#B0637A',
        secundary: '#FCEAEA',
        texto: '#4A565B',
      },
    },
  },
  plugins: [],
}