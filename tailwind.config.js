module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,svg}", "./pages/**/*.{js,jsx,ts,tsx,svg}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [],
}
