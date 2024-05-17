/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B5ED7",
        gray: {
          100: "#f7f7f7",
          200: "#e1e1e1",
          300: "#cfcfcf",
          400: "#b1b1b1",
          500: "#939393",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      borderColor: {
        primary: "#0B5ED7",
      },
    },
  },
  plugins: [],
};
