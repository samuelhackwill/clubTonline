/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./imports/ui/**/*.{js,html}",
    "./client/*.html"
  ],
  theme: {
    extend: {
      keyframes:{
        aura:{
          '25%,75%':{transform:'translateX(50px)'}
        }
      }
    },
  },
  plugins: [],
}

