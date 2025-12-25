// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: [
      {
        mesylab: {
          primary: '#264653',
          secondary: '#344c77',
          accent: '#e9c46a',
          neutral: '#0a0a13',
          'base-100': '#fff',
          info: '#2a9d8f',
          success: '#2a9d8f',
          warning: '#f4a261',
          error: '#e76f51'
        }
      }
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root' // The element that receives theme color CSS variables
  }

}
