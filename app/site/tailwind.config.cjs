const tailwindColors = require('tailwindcss/colors')

const colors = [
  "primaryfg",
  "primarybg",
  "flashyfg",
  "flashybg",
].reduce((prev, name) => {
  prev[name] = `rgb(var(--${name}-rgb) / <alpha-value>)`; return prev
}, {})

module.exports = {
  // TODO Can we include a lib?
  content: ["./src/**/*.{html,js,ejs}", "./**/*.{tsx,ts,mdx}", "../../lib/components/**/*.{js,jsx}", "index.html"],
  theme: {
    extend: {
      colors,
      spacing: ({ spacing }) => ({
        ...spacing,
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '4rem'
      }),
      fontFamily: {
        flashy: ['var(--flashy-font)'],
        prose: ['var(--prose-font)'],
      },
    },
  },
  plugins: [],
}
