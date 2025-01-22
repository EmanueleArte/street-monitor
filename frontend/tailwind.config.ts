import colors from 'tailwindcss/colors'

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
        gray: {
          500: "#6b7280",
        },
        
        primary: {
          default: '#2196F3',
          accent: '#1565C0'
        },
        secondary: {
          default: '#8BC34A',
          accent: '#388E3C'
        },
        tertiary: {
          default: '',
          accent: ''
        },
        surface: {
          default: '#fafafa',
          component: '#f5f5f5',
          divider: '#e0e0e0'
        },
        dark: {
          default: '#212121',
          disabled: '#bdbdbd'
        },
        error: {
          default: colors.red[800]
        }
      },
      borderRadius: {
        "xl": "0.75rem",
        "full": "9999px",
      }
    },
  },
  plugins: [],
}

