module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        color: {
          primary: "#046FD1",
          secondary: "#024D92",
          error: "#EE3124",
          light: "FDFDFD",
          silver: "F8FBFB",
          dark: "#2A3C44",
          gray: "#314955",
          disable:"DEE3ED",
          },
        },
    },
    plugins: [require("@tailwindcss/typography")],
  };