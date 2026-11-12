/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        accidentalPresident: ["var(--font-accidental-president)", "sans-serif"],
        horizon: ["var(--font-horizon)", "sans-serif"],
      },
    },
  },
  plugins: [],
}