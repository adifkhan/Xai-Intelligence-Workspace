/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#07080A",
          900: "#0B0D10",
          800: "#12151A",
          700: "#1B1F26",
          600: "#262B34",
        },
        ink: {
          400: "#8A93A3",
          300: "#AEB6C2",
          100: "#F3F5F7",
        },
        accent: {
          DEFAULT: "#5B8CFF",
          dim: "#2E4A8F",
          glow: "#7FA3FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
