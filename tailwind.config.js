  /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./WebSample.html", // Make sure this is correct for your main HTML file
    // ... any other paths for files using Tailwind classes
  ],
  theme: {
    extend: {
      // Your custom font families and colors should be here
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        'primary-blue': '#0A6868',
        'secondary-blue': '#4D9696',
        'dark-text': '#333333',
        'light-gray-bg': '#F8F8F8',
        'medium-gray-text': '#888888',
        'border-gray': '#E0E0E0',
        'card-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
}