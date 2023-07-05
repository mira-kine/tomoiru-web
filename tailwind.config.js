/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        licorice: '#221713',
        armygreen: '#707354',
        periwinkle: '#BBD3FB',
        melon: '#BAEBD6',
        peach: '#F7B390',
        chick: '#FDF6B4'
      },
      fontFamily: {
        script: ['var(--font-cherry'],
        sans: ['var(--font-gruppo']
      }
    }
  },
  plugins: []
};
