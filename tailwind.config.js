const icons = require("rocketicons/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        appPrimary: "#F0544F",
        appSecondary: "#d81e5b",
        appTertiary: "#c6d8d3",
        appAccent: "#fdf0d5",
        appEasy: "#27AE60",
        appMedium: "#E2B93B",
        appHard: "#EB5757",

        // For button background colors
        appFadedPrimary: "#D8B3F2",
        appFadedAccent: "#FFD5DE",

        gray1: "#3a3335",
        gray2: "#4F4F4F",
        gray3: "#828282",
        gray4: "#BDBDBD",
        gray5: "#E0E0E0",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide"), icons],
  components: {
    icon: {
      default: "gray-500-base",
      variants: {
        filled: "",
        outlined: ""
      },
      sizes: {
        xs: "size-2",
        sm: "size-4",
        base: "size-5",
        lg: "size-6",
        xl: "size-7",
        "2xl": "size-8",
        "3xl": "size-9",
        "4xl": "size-10",
        "5xl": "size-11",
        "6xl": "size-12",
        "7xl": "size-14",
      },
    },
  },
}

