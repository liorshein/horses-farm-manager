/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ADD8E6"
      },
      transitionProperty: {
        'width': 'width'
      },
      backgroundImage: {
        'horse': "url('/src/assets/gifs/horse.gif')",
        'loginImage': "url('/src/assets/images/horses_hay.jpg')"
      }
    },
  },
  plugins: [],
}