import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        mutedForeground: "hsl(var(--muted-foreground))",
        card: "hsl(var(--card))",
        cardForeground: "hsl(var(--card-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        }
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)"
      },
      backgroundImage: {
        grid: "linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(255,255,255,0.06) calc(100% - 1px)), linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(255,255,255,0.06) calc(100% - 1px))"
      }
    }
  },
  plugins: [],
};

export default config;

