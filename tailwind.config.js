/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#E11D48',   // Deep Rich Red (Appetite Trigger)
          secondary: '#F59E0B', // Golden Yellow (Crispy Vibe)
          dark: '#0F172A',      // Charcoal Black (Premium Look)
        }
      }
    },
  },
  plugins: [],
}