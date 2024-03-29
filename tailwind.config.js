/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,html}", "./client/*.html"],
  theme: {
    extend: {
      keyframes: {
        auraKeys: {
          "25%, 75%": {
            "border-radius": "60% 40% 40% 60% / 60% 40% 60% 40%;",
          },
          "50%": {
            "border-radius": "40% 60% 60% 40% / 40% 60% 40% 60%;",
            transform: "rotate(0deg);",
          },
          "100%, 0%": {
            transform: "rotate(360deg);",
            "border-radius": "60% 40% 40% 60% / 60% 40% 60% 40%;",
          },
        },
        cardMoveKeys: {
          "0%": {
            top: "0px",
            left: "0px",
          },
          "100%": {
            top: "50vh",
            left: "50vw",
          },
        },
      },
      animation: {
        aura: "auraKeys 30s infinite linear",
        cardMove: "carMoveKeys 3s infinite linear",
      },
      colors: {
        "yellow-clubT": "#fef9c3",
        "yellow2-clubT": "#d4d0a3",
        contrasting: "purple-400",
        faded: "purple-200",
      },
      backgroundImage: {
        "logo-clubT": "url('/img/logo_xs.png')",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
  safelist: ["animate-cardMove"],
};
