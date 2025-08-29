import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx,css}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f9f9f9",
        surface: "#ffffff",
        ink: "#0e0e0e",
        muted: "#6b7280",
        brand: "#D1A954",
        punch: "#E21D2B",
        ring: "rgba(0,0,0,.06)"
      },
      boxShadow: {
        elev: "0 10px 24px rgba(0,0,0,.08)"
      },
      borderRadius: {
        brand: "20px",
        pill: "999px"
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
}
export default config
