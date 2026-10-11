/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0B0F19",
          850: "#111827",
          800: "#1E293B",
          700: "#334155",
        },
        slate: {
          850: "#151F30",
        },
        brand: {
          emerald: "#10B981",
          cyan: "#06B6D4",
          coral: "#EF4444",
          amber: "#F59E0B",
          indigo: "#6366F1",
        },
      },
      fontFamily: {
        sans: ["Inter", "Plus Jakarta Sans", "Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(16, 185, 129, 0.3)",
        "glow-cyan": "0 0 20px -5px rgba(6, 182, 212, 0.3)",
      },
    },
  },
  plugins: [],
};
