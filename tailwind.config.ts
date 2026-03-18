import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary — True Blue */
        navy: {
          DEFAULT: "#001965",
        },
        /* Primary — Sea Blue */
        sea: {
          900: "#005AD2",
          800: "#1A6DD7",
          700: "#3380DB",
          600: "#4D8EE0",
          500: "#66A3E4",
          400: "#80B6E9",
          300: "#99C8ED",
          200: "#B3D9F2",
          100: "#CCE6F6",
          50: "#E8F2FC",
        },
        /* Neutrals */
        nn: {
          900: "#272E41",
          800: "#3D485C",
          700: "#556280",
          600: "#6E7A96",
          500: "#8892AB",
          400: "#A3ABB9",
          300: "#BCC2CE",
          200: "#D5D9E0",
          100: "#EBEDF1",
          50: "#F5F6F8",
        },
        /* Danger */
        danger: {
          900: "#8F2219",
          800: "#C5261C",
          700: "#DB3A1F",
          600: "#E25A4C",
          500: "#E97170",
          400: "#ED8D8F",
          300: "#F1AAA5",
          200: "#F6CDC9",
          100: "#FBE4E2",
          50: "#FDF2F1",
        },
        /* Success — Ocean Green */
        ocean: {
          900: "#117077",
          800: "#298A85",
          700: "#419792",
          600: "#58A4A0",
          500: "#70B1AD",
          400: "#88BEBB",
          300: "#A0CBC9",
          200: "#C0DDDB",
          100: "#DFEEEE",
          50: "#F0F7F7",
        },
      },
    },
  },
  plugins: [],
};
export default config;
