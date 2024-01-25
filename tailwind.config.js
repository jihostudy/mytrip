/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        modalBackground: "#00000066",
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
