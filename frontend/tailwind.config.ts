/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,vue}"],
  theme: {
    extend: {
      colors: {
        "button-text": "#ffffff",
        "light": "#ffffff",
        "main": {
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      borderRadius: {
        "xl": "0.75rem",
        "full": "9999px",
      }
    },
  },
  plugins: [],
}

