import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        pink: "0px 0px 6px 3px rgba(255, 0, 255, 0.25)",
        blue: "0px 0px 6px 3px rgba(6, 231, 236, 0.25)",
        footer: "0px -4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
