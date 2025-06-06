import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  // Common theme settings across both apps
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  spacing: 8, // This is the default spacing unit (8px)
  // Other shared configurations
});
