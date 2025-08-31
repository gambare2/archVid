/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "translate(-50%, -75%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -75%) rotate(360deg)" },
        },
      },
      animation: {
        wave1: "wave 10s linear infinite",
        wave2: "wave 15s linear infinite",
        wave3: "wave 20s linear infinite",
      },
    },
  },
  plugins: [],
  
}

