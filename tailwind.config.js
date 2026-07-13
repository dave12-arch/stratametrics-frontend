/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      mono: ['"Roboto Mono"', 'monospace'],
    },
    colors: {
      brand: {
        500: '#D4AF37', // Muted Metallic Gold
        600: '#AA8C2C',
      },
      background: '#0B1120', // Very deep, rich navy (Tailwind slate-950)
      surface: '#1E293B',    // Tailwind slate-800
    }
  }
},
  plugins: [],
}