import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-tenor-sans)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        "mrs-saint-delafield": ["var(--font-mrs-saint-delafield)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
