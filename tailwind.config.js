/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: "640px",
      tablet: "768px",
      laptop: "1024px",
      desktop: "1280px",
    },
    extend: {
      fontFamily: {
        script: ["var(--font-cherry)"],
        sans: ["var(--font-gruppo)"],
      },
      colors: {
        white: "#FFFFFF",
        licorice: "#221713",
        armygreen: "#707354",
        periwinkle: "#BBD3FB",
        melon: "#BAEBD6",
        peach: "#F7B390",
        chick: "#FDF6B4",
        grey: '#808080'
      },
      boxShadow: {
        navbar: "0 5px 10px 0px rgba(170, 170, 170, 0.85)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
