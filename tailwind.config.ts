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
        starehe: {
          blue: {
            50: "#eef5fc",
            100: "#d9e9f9",
            200: "#b9d6f4",
            300: "#89bbed",
            400: "#539ae2",
            500: "#2b7cd5",
            600: "#1d62b9",
            700: "#184f97",
            800: "#17437c",
            900: "#0c2340", // Primary Institutional Navy
            950: "#061324",
          },
          maroon: {
            50: "#fdf2f2",
            100: "#fbe4e5",
            200: "#f6cecf",
            300: "#eeaaac",
            400: "#e2797c",
            500: "#d14e52",
            600: "#bb373b",
            700: "#a8262b",
            800: "#8b1e22", // Primary Institutional Maroon
            900: "#751e22",
            950: "#420a0d",
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
          sand: "#fdfbf7",
          cream: "#f7f5ef",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        display: ["Merriweather", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.08)",
        elevation: "0 10px 30px -10px rgba(12, 35, 64, 0.12)",
        card: "0 4px 20px -2px rgba(12, 35, 64, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
