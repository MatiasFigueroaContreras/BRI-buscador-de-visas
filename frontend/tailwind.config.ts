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
        'text': '#e6e6eb',
        'background': '#020218',
        'primary': '#ff1a90',
        'secondary': '#25258d',
        'accent': '#3434df',
        'bg-shade-1': '#0B0B2A',
        'bg-shade-2': '#0F0F38',
        'bg-shade-3': '#121243',
        'bg-shade-4': '#161655',
        'red': '#FF0000',
      },
      boxShadow: {
        'sh-hr': '0px 1px 8px 0px rgba(255, 26, 144, 0.4)',
        'sh-primary': '0px 0px 50px 0px rgba(255, 26, 144, 0.65)',
        'sh-white': '0px 0px 80px 0px rgba(230, 230, 235, 0.15)',
        'sh-button': '2px 2px 6px 0px rgba(230, 230, 235, 0.10)',
        'sh-button-hover': '2px 2px 6px 0px rgba(255, 26, 144, 0.35)',
      },
      dropShadow: {
        'dsh-primary': '0px 0px 6px rgba(255, 26, 144, 0.85)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
