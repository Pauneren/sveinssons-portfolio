/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // include App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC1DB7', // Bright pink - your specified accent
        deep: '#0E172A', // Dark background - your specified
        teal: '#21CEE0', // Cyan - your specified
        muted: '#94A3B8', // Muted slate - for text readability
        accent: '#DC1DB7', // Same as primary for consistency
        surface: '#1E293B', // Slate surface - complements your colors
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
