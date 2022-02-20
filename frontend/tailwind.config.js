module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Freshman", "sans-serif"],
        Oxigen: ["Oxygen", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        drac_bg: "#22252d",
        drac_bg2: "#2b2f37",
        drac_selection: "#44475a",
        drac_foreground: "#f8f8f2",
        drac_comment: "#6272a4",
        drac_cyan: "#8be9fd",
        drac_green: "#50fa7b",
        drac_orange: "#ffb86c",
        drac_pink: "#ff79c6",
        drac_purple: "	#bd93f9",
        drac_red: "#ff5555",
        drac_yellow: "#f1fa8c",
        twitchPurple: "#54378A",
        twitterBlue: "#1DA1F2",
        primary: "#643ada",
        "primary-focus": "#8462f4",
        "primary-content": "#ffffff",

        secondary: "#f6d860",
        "secondary-focus": "#f3cc30",
        "secondary-content": "#ffffff",

        accent: "#fa0035",
        "accent-focus": "#910120",
        "accent-content": "#ffffff",

        neutral: "#3d4451",
        "neutral-focus": "#2a2e37",
        "neutral-content": "#ffffff",

        "base-100": "#ffffff",
        "base-200": "#f9fafb",
        "base-300": "#d1d5db",
        "base-content": "#1f2937",

        info: "#2094f3",
        success: "#009485",
        warning: "#ff9900",
        error: "#ff5724",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  daisyui: {
    styled: true,
   themes: false
  },
}
