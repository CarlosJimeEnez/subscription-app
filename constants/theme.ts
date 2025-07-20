import { createTheme } from '@shopify/restyle';
import { Colors } from './Colors';

// Define a theme using our Colors palette
const theme = createTheme({
  colors: {
    background: Colors.background,
    foreground: Colors.text, // Foreground color is text color
    primary: Colors.primary,
    secondary: Colors.secondary,
    muted: Colors.muted,
    accent: Colors.accent,
    text: Colors.text, // Ensure text is white
    tertiary: Colors.tertiary,
    success: Colors.success,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

type Theme = typeof theme;

export default theme;
export type { Theme };
