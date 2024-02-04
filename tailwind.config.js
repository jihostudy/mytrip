/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        chosun: ["chosun"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        modalBackground: "#00000066",
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        "1/10": "10%",
        "1/8": "12.5%",
      },
      height: {
        "1/10": "10%",
        "1/8": "12.5%",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        box: "0 0 4px rgba(0,0,0,0.25)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        // header: {
        //   "0%": {
        //     backgroundPosition: "0% 50%",
        //   },
        //   "50%": {
        //     backgroundPosition: "100% 50%",
        //   },
        //   "100%": {
        //     backgroundPosition: "0% 50%",
        //   },
        // },
      },
    },
    animation: {
      wiggle: "wiggle 0.01s linear 1",
      // header: "header 20s ease-in-out infinite",
    },
  },
};
