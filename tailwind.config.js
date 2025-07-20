/** @type {import('tailwindcss').Config} */

import { Colors } from "./constants/Colors";

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: Colors.primary,
        secondary: Colors.secondary,
        background: Colors.background,
        text: Colors.text,
        tertiary: Colors.tertiary,
        success: Colors.success,
        muted: Colors.muted,
        accent: Colors.accent
      },
    },
  },

  plugins: [],
}