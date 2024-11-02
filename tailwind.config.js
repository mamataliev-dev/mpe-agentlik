/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: "#11BE86",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d1",
          300: "#6ee7b8",
          400: "#34d39a",
          500: "#11be86",
          600: "#05966a",
          700: "#047858",
          800: "#065f47",
          900: "#064e3c",
          950: "#022c22",
          light: "#EEFFFA",
          dark: "#1D2825",
          gray: "#97A9A4",
        },
        blue: {
          DEFAULT: "#1878F3",
        },
        red: {
          DEFAULT: "#EB5757",
        },
        white: {
          DEFAULT: "#FFFFFF",
          footer: "#E7EDFB",
          0: "#F5F5F7",
          "01": "#FBFBFF",
          111: "#F5F8FA",
          222: "#E7EDFB",
        },
        black: "#020105",
        grey: {
          DEFAULT: "#9A999B",
          0: "#5D5D5F",
          1: "#C2CAD3"
        },
        borderColor: "#E7EDFB",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        golos: ["Golos Text", "sans-serif"],
        ttfirs: ["TT Firs Neue Trl", "sans-serif"],
      },
      borderRadius: {
        "br-8": "8px",
        "br-12": "12px",
        "br-16": "16px",
      },
      padding: {
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
      },
      margin: {
        40: "40px",
        80: "80px",
      },
      screens: {
        xs: "450px",
      }
    },
  },
  plugins: [],
};
