/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: { 
      'sans': ['"Open Sans"'],
    }
  },
  plugins: [],
  safelist: [
    "bg-blue-500",
    "bg-red-500",
    "text-blue-500",
    "text-red-500",
    "border-blue-500",
    "border-red-500",
    "hover:bg-blue-500",
    "hover:bg-red-500"
  ]
}

