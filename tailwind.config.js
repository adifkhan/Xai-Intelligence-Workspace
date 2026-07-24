/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0C0F",
          elev: "#15171C",
          "elev-2": "#1B1E24",
        },
        text: {
          DEFAULT: "#E9EAEE",
          dim: "#8C8F99",
          faint: "#5A5D68",
        },
        ink: {
          400: "#8A93A3",
          100: "#F3F5F7",
        },
        accent: "#5B8CFF",
        signal: "#5B84FF",
        insight: "#FFB454",
        border: "rgba(255,255,255,0.08)",
        "border-strong": "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
