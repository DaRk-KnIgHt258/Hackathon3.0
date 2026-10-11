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
        surface: '#FFFFFF',
        'surface-dim': '#F8F9FA',
        'surface-bright': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F8FAFC',
        'surface-container': '#F1F5F9',
        'surface-container-high': '#E2E8F0',
        'surface-container-highest': '#CBD5E1',
        'on-surface': '#263238',
        'on-surface-variant': '#455A64',
        outline: '#C6A45C',
        'outline-variant': '#E2E8F0',
        primary: '#10233F',
        'on-primary': '#FFFFFF',
        'primary-container': '#1D3557',
        'on-primary-container': '#F8FAFC',
        secondary: '#C6A45C',
        'on-secondary': '#10233F',
        'secondary-container': '#F9F5EB',
        'on-secondary-container': '#6B5421',
        background: '#FFFFFF',
        'on-background': '#263238',
        // Also keep legacy / utility colors
        navy: {
          950: "#070B14",
          900: "#0B0F19",
          850: "#10233F",
          800: "#172D4E",
          700: "#1D3557",
        },
      },
      fontFamily: {
        headline: ["Sora", "sans-serif"],
        display: ["Sora", "sans-serif"],
        body: ["IBM Plex Sans", "sans-serif"],
        label: ["IBM Plex Sans", "sans-serif"],
        serif: ["Merriweather", "serif"],
        sans: ["IBM Plex Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        glow: "0 0 20px -5px rgba(198, 164, 92, 0.35)",
        "glow-navy": "0 0 20px -5px rgba(16, 35, 63, 0.35)",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

