const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      arch: ["Architects Daughter", "cursive"],
      conf: ["Comfortaa", "cursive"],
    },
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn": {
          color: "#fff",
          backgroundColor: "#312e81",
          padding: "0.5rem",
          fontFamily: "Comfortaa, cursive",
          borderRadius: "0.75rem",
          textAlign: "center",
          transition: "all 0.5s",
          "&:hover": {
            backgroundColor: "#6366f1",
          },
        },
      });
    }),
  ],
};
