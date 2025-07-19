/** @type {import('tailwindcss').Config} */

import Colors from "./constants/Colors";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: Colors.light.primary,
          secondary: Colors.light.secondary,
          background: Colors.light.background,
          text: Colors.light.text,
          tertiary: Colors.light.tertiary,
          success: Colors.light.success,
        },
        dark: {
          primary: Colors.dark.primary,
          secondary: Colors.dark.secondary,
          background: Colors.dark.background,
          text: Colors.dark.text,
          tertiary: Colors.dark.tertiary,
          success: Colors.dark.success,
        }
      },
    },
  },

  plugins: [],
}