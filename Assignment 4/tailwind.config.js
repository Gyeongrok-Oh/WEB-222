/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  content: [`./views/**/*.ejs`], // all .ejs files
  theme: {
    extend: {},
  },
  plugins: [],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['cupcake'],
  },
};
