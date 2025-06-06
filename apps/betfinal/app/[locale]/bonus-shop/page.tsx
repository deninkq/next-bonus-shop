"use client";

import { useUser } from "@context/UserContext";
import { getEligibleBonuses } from "@utils/bonusUtils";
import BonusCard from "@shared/BonusCard";
import Deposit from "@shared/Deposit/Deposit";
import { Box, Grid, Typography, Container } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";

const BonusShop = () => {
  const { user } = useUser();
  const locale = useLocale();
  const translations = useTranslations("BonusPage");
  const eligibleBonuses = getEligibleBonuses(user, "betfinal");

  return (
    <Container maxWidth="lg">
      <Typography variant="h1" textAlign={"center"} marginTop={"100px"}>
        {translations("heading")}
      </Typography>
      <Typography variant="h2" sx={{ textAlign: "center", margin: "30px 0" }}>
        {translations("welcome")} {user?.username}
      </Typography>
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h2" sx={{ textAlign: "center", margin: "30px 0" }}>
          {translations("balance")}: {user?.currentBalance}$
        </Typography>
        <Deposit buttonText={translations("deposit")} />
      </Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        {!user ? (
          <></>
        ) : eligibleBonuses.length === 0 ? (
          <Typography variant="h4">{translations("noBonuses")}</Typography>
        ) : (
          <Grid container spacing={5} display={"flex"} flex={1}>
            {eligibleBonuses.map((bonus) => (
              <Grid size={{ xs: 12, sm: 6 }} key={bonus.id}>
                <BonusCard bonus={bonus} locale={locale} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default BonusShop;
