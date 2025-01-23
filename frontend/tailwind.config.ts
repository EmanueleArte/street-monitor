import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: colors.blue[100],
          600: colors.blue[600],
          700: colors.blue[700]
        },
        surface: {
          default: '#fafafa',
          component: '#f5f5f5',
          divider: '#e0e0e0'
        },
        error: {
          400: colors.red[400],
          800: colors.red[800]
        },
        light: '#fafafa'
      }
    },
  },
  plugins: [],
}

