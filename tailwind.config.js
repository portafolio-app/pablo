/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'selector', // Para Tailwind v4 usa 'selector' en lugar de 'class'
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
