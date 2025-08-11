/** @type {import('tailwindcss').Config} */

import { heroui } from "@heroui/react";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mob: { max: "767px" },
        tab: { min: "768px", max: "1023px" },
        mobtab: { max: "1023px" },
      },
    },
  },
  plugins: [heroui()],
};
