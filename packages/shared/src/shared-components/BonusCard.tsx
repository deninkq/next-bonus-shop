"use client";
import * as React from "react";
import { Bonus } from "../types/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface BonusCardProps {
  bonus: Bonus;
  locale: string;
}

function BonusCard({ bonus, locale }: BonusCardProps) {
  const { description, name } = bonus;
  return (
    <Card variant="elevation">
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {locale === "en" ? name.en : name.ar}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {locale === "en" ? description.en : description.ar}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BonusCard;
