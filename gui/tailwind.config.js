/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/theme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|code|divider|dropdown|image|input|kbd|link|listbox|modal|navbar|snippet|spacer|toggle|ripple|spinner|menu|popover).js"
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'), nextui()],
}