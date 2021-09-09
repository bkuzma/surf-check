module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,svg}", "./public/index.html"],
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
