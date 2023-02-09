/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Josefin: ['Josefin Sans', 'sans-serif'],
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        light: {
          primary: 'hsl(0, 0%, 98%)',
          secondary: 'hsl(236, 33%, 92%)',
          tertiary: 'hsl(233, 11%, 84%)',
          quaternary: 'hsl(236, 9%, 61%)',
          quinary: 'hsl(235, 19%, 35%)',
        },
        dark: {
          primary: 'hsl(235, 21%, 11%)',
          secondary: 'hsl(235, 24%, 19%)',
          tertiary: 'hsl(234, 39%, 85%)',
          quaternary: 'hsl(236, 33%, 92%)',
          quinary: 'hsl(234, 11%, 52%)',
        },
      },
    },
  },
  plugins: [],
};
