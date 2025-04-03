/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep blue
        secondary: '#3B82F6', // Bright blue
        accent: '#F59E0B', // Amber
        background: '#F3F4F6', // Light gray
        text: '#1F2937', // Dark gray
      },
    },
  },
  plugins: [],
}

