"use client";

import { Typography, Container, Button, Box } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  const t = useTranslations("Home");
  const locale = useLocale();

  const handleButtonClick = () => {
    router.push(`/${locale}/logIn`);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "40px",
        }}
      >
        <Typography variant="h1" textAlign={"center"} marginTop={"100px"}>
          {t("welcome.title")}
        </Typography>
        <Button variant="contained" onClick={handleButtonClick}>
          Log in
        </Button>
      </Box>
    </Container>
  );
};

export default Welcome;
