"use client";

import { UserProvider } from "@context/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import { cosmosTheme } from "@theme/cosmoswinTheme";
import { ThemeProvider } from "@mui/material";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={cosmosTheme}>
      <CssBaseline />
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
}
