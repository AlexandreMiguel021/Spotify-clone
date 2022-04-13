// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'src/pages/**/*.{js,ts,jsx,tsx}',
    'src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['spotify-circular', ...fontFamily.sans]
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      gridAutoColumns: {
        '2fr': 'minmax(1.4fr, 0.6fr)'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}
