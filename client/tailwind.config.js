/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      backgroundImage: {
        'horse': "url('/src/assets/gifs/horse.gif')",
        'loginImage': "url('/src/assets/images/horseDrawing2.jpg')"
      }
    },
  },
  plugins: [],
}