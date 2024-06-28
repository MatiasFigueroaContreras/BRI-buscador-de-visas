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
        text: {
          primary: {
            dark: "#040316",
            light: "#FBFBFE",
          },
        },
        background: "#FBFBFE",
        primary: {
          100: "#ced2d8",
          200: "#9da5b1",
          300: "#6d788a",
          400: "#3c4b63",
          500: "#0b1e3c",
          600: "#091830",
          700: "#071224",
          800: "#040c18",
          900: "#02060c",
        },
        secondary: {
          100: "#f3f2ff",
          200: "#e6e5ff",
          300: "#dad7ff",
          400: "#cdcaff",
          500: "#c1bdff",
          600: "#9a97cc",
          700: "#747199",
          800: "#4d4c66",
          900: "#272633",
        },
        accent: {
          100: "#d0d2db",
          200: "#a1a5b7",
          300: "#737894",
          400: "#444b70",
          500: "#151e4c",
          600: "#11183d",
          700: "#0d122e",
          800: "#080c1e",
          900: "#04060f",
        },
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};
export default config;
