/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#070907',
        charcoal: '#101410',
        graphite: '#191f1b',
        lime: '#c8ff36',
        acid: '#7cff4b',
        mist: '#dfe7dc',
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lime: '0 0 42px rgba(200, 255, 54, 0.16)',
      },
    },
  },
  plugins: [],
}
