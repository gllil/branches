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
            backgroundColor: "#4c1d95",
          },
        },
        html: {
          minHeight: "100vh",
        },
        body: {
          minHeight: "100vh",
          margin: "0",
          display: "flex",
          flexDirection: "column",
        },
        ".input-box": {
          marginBottom: "15px",
          width: "calc(100% / 2 - 20px)",
          "@media (max-width: 640px)": {
            marginBottom: "15px",
            width: "100%",
          },
        },
        ".details": {
          display: "block",
          fontWeight: "600",
          marginBottom: "5px",
        },
        input: {
          width: "100%",
          height: "45px",
          outline: "none",
          borderRadius: "5px",
          border: "1px solid #ccc",
          paddingLeft: "15px",
          fontSize: "16px",
          borderBottomWidth: "2px",
          transition: "all 0.3s ease",
          "&:focus": {
            borderColor: "#9b59b6",
          },
          "&:valid": {
            borderColor: "#9b59b6",
          },
        },
        ".heart-fruit": {
          "&:hover": {
            animation: "swing",
            "animation-duration": "2s",
          },
        },
      });
    }),
  ],
};
