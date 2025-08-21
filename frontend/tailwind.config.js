/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#18181b',
        },
        primary: {
          DEFAULT: '#22223b',
          dark: '#f2e9e4',
        },
        muted: {
          DEFAULT: '#666',
          dark: '#aaa',
        },
        border: {
          DEFAULT: '#e5e7eb',
          dark: '#333',
        },
        error: {
          DEFAULT: '#dc2626',
          dark: '#f87171',
        },
      },
    },
  },
  plugins: [],
}

