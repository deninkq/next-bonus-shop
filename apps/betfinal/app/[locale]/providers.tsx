'use client';

import { UserProvider } from "@context/UserContext";
import CssBaseline from "@mui/material/CssBaseline";
import { betfinalTheme } from "@theme/betfinalTheme";
import { ThemeProvider } from "@mui/material";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={betfinalTheme}>
      <CssBaseline />
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  );
}