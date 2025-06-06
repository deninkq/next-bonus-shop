"use client";

import { useUser } from "@context/UserContext";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LanguageSelect from "@shared/LanguageSelect";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const { user, clearUser } = useUser();
  const router = useRouter();
  const locale = useLocale();
  const translations = useTranslations("LogInForm");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleButtonClick = () => {
    if (!user) {
      router.push(`/${locale}/logIn`);
    } else {
      clearUser();
      router.push(`/${locale}/logIn`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <LanguageSelect locale={locale} />
          <Button type="button" color="inherit" onClick={handleButtonClick}>
            {!user ? translations("Login") : translations("Logout")}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
