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
      keyframes: {
      bike: {
        '0%, 100%': {
          transform: 'translateX(0px)',
        },
        '50%': {
          transform: 'translateX(8px)',
        },
      },
    },
    animation: {
      bike: 'bike 1.5s ease-in-out infinite',
    },
    },
  },
  plugins: [],
}