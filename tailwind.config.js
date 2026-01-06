/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",       // pages folder
    "./src/components/**/*.{js,jsx,ts,tsx}",  // components folder
    "./src/app/**/*.{js,jsx,ts,tsx}"          // хэрэв app folder байгаа бол
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
