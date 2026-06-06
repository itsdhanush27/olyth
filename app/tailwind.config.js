/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Olyth Brand Colors
        orange: {
          DEFAULT: "#F6941D",
          dark: "#E07E0A",
          darker: "#C96A00",
        },
        teal: {
          DEFAULT: "#00C9A7",
          dark: "#00B395",
        },
        charcoal: "#1a1a2e",
        brown: "#332E2E",
        // cream is now a light gray surface color for backgrounds, borders, and subtle fills
        cream: "#F0F2F5",
        peach: "#FDE3C5",
        blush: "#F4D1D9",
        clay: "#64748B",
        graytext: "#6B7280",
      },
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        pill: "40px",
        card: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0px 1px 4px rgba(0, 0, 0, 0.06), 0px 4px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0px 4px 24px rgba(246, 148, 29, 0.15), 0px 1px 4px rgba(0,0,0,0.04)",
        nav: "0px 1px 0px rgba(0, 0, 0, 0.06)",
        "nav-scroll": "0px 4px 16px rgba(0, 0, 0, 0.08)",
        "btn-primary-hover": "0px 4px 16px rgba(246, 148, 29, 0.35)",
        mega: "0px 8px 32px rgba(0, 0, 0, 0.10), 0px 2px 8px rgba(0,0,0,0.06)",
        widget: "0px 4px 24px rgba(246, 148, 29, 0.4)",
        "widget-card": "0px 8px 32px rgba(0, 0, 0, 0.12)",
        dashboard: "0px 20px 60px rgba(0, 0, 0, 0.18)",
      },
      maxWidth: {
        content: "1400px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "widget-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "widget-ring": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "card-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "widget-pulse": "widget-pulse 2s infinite ease-in-out",
        "widget-ring": "widget-ring 3s infinite",
        float: "float 4s infinite ease-in-out",
        "card-float": "card-float 5s infinite ease-in-out alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}