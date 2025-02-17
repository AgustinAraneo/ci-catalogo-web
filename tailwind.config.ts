import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "banner-contacto": 'url("/assets/Banners/contacto.jpg")',
        "banner-home": 'url("/assets/Banners/inicio.jpg")',
        "banner-discount": 'url("/assets/Banners/home.png")',
        "banner-trending-1": 'url("/assets/Productos/Blazers.jpg")',
        "banner-trending-2": 'url("/assets/Productos/Pantalones.jpg")',
        "banner-trending-3": 'url("/assets/Productos/Remeras.jpg")',
        "banner-trending-4": 'url("/assets/Productos/Blazers.jpg")',
        "banner-trending-5": 'url("/assets/Productos/Pantalones.jpg")',
        "banner-trending-6": 'url("/assets/Productos/Remeras.jpg")',
        "banner-trending-7": 'url("/assets/Productos/Blazers.jpg")',
        "banner-trending-8": 'url("/assets/Productos/Pantalones.jpg")',
        "banner-trending-9": 'url("/assets/Productos/Remeras.jpg")',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        gold: "#c89018",
        "black-primary": "#1B1E20",
      },
      fontFamily: {
        sans: ["var(--font-tenor-sans)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        "mrs-saint-delafield": ["var(--font-mrs-saint-delafield)", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "redcoach-lg": "0px 4px 16px 0px rgba(0, 0, 0, 0.10)",
        "redcoach-sm": "0px 3px 15px 0px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
