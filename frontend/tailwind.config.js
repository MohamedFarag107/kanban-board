/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f8fb",
          100: "#e8f0f6",
          200: "#d3e5ed", // light blue
          300: "#a0c8d9",
          400: "#6dabc3",
          500: "#4b91ac",
          600: "#397590",
          700: "#2f5e75",
          800: "#2a5062",
          900: "#274553",
          950: "#1a2c37",
        },
      },
    },
  },
  plugins: [],
};
