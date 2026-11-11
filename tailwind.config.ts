import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#07529A",
          primaryHover: "#06427C",
          primaryLight: "#EAF3FC",
          secondary: "#E32620",
          secondaryHover: "#BD1F1A",
          navy: "#092D50",
          bg: "#FFFFFF",
          bgSecondary: "#F4F6F9",
          surface: "#FFFFFF",
          border: "#E5E7EB",
          textPrimary: "#092D50",
          textSecondary: "#4B5563",
          textMuted: "#6B7280",
        },
        slate: {
          50: "#F4F6F9",
          100: "#EBEEF3",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#092D50",
          950: "#061D35",
        },
        starehe: {
          blue: {
            50: "#EAF3FC",
            100: "#D4E6FA",
            200: "#A9CDF4",
            300: "#7CB2ED",
            400: "#4B91E0",
            500: "#2273CC",
            600: "#07529A",
            700: "#07529A",
            800: "#06427C",
            900: "#07529A", // --primary
            950: "#092D50", // --navy
          },
          maroon: {
            50: "#FEF2F2",
            100: "#FDE3E2",
            200: "#FCCBC9",
            300: "#F8A6A3",
            400: "#F2726D",
            500: "#E94640",
            600: "#E32620",
            700: "#BD1F1A", // --secondary-hover
            800: "#E32620", // --secondary / --button-accent
            900: "#BD1F1A",
            950: "#7F1411",
          },
          gold: {
            50: "#fbf9ed",
            100: "#f6f0d1",
            200: "#eee0a4",
            300: "#e4ca6f",
            400: "#d9b342",
            500: "#c79a26",
            600: "#ab7b1e",
            700: "#895a1b",
            800: "#72481d",
            900: "#613d1d",
            accent: "#d4af37",
          },
          sand: "#FFFFFF",
          cream: "#F4F6F9",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        display: ["Merriweather", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(9, 45, 80, 0.05), 0 1px 2px rgba(9, 45, 80, 0.07)",
        elevation: "0 10px 30px -10px rgba(9, 45, 80, 0.14)",
        card: "0 4px 20px -2px rgba(9, 45, 80, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
