/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0b2b40", // deep navy
          dark: "#081f2e",
        },
        secondary: {
          DEFAULT: "#d9a404", // gold
          hover: "#c4950a",
          light: "#e8b80a",
        },
        accent: {
          DEFAULT: "#c44536", // terra cotta
          hover: "#a83b2e",
        },
        neutralBg: "#f4f7fc", // body bg
        cardBg: "#ffffff",
        customGray: {
          light: "#f0f3f8", // light gray
          medium: "#d0d7e2",
          dark: "#3e4a5e",
        }
      },
      borderRadius: {
        custom: "24px",
      },
      boxShadow: {
        custom: "0 12px 28px rgba(0,0,0,0.08)",
        hover: "0 20px 32px rgba(0,0,0,0.12)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
