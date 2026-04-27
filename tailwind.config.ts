import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f7fde8",
          100: "#edfbb2",
          200: "#def870",
          300: "#c9ed76",
          400: "#b8d960",
          500: "#c9ed76",
          600: "#a8ca3e",
          700: "#7aaa2e",
          800: "#527016",
          900: "#2a380b",
        },
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          800: "#292524",
          900: "#1c1917",
        },
      },
    },
  },
  plugins: [],
};

export default config;
