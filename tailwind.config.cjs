module.exports = {
  darkMode: 'class', // or 'media'
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],


  extend: {
  animation: {
    fadeIn: 'fadeIn 0.6s ease-out forwards',
    slideIn: 'slideIn 0.4s ease-out forwards',
  },
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideIn: {
      '0%': { opacity: 0, transform: 'translateX(-20px)' },
      '100%': { opacity: 1, transform: 'translateX(0)' },
    },
  },
}

};
