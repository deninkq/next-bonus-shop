"use client";

import { Locale, routing, usePathname, useRouter } from "@i18n/routing";
import { useParams } from "next/navigation";
import { Select, MenuItem, FormControl, styled } from "@mui/material";
import { useEffect, useState } from "react";

const languageNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

interface LanguageProps {
  locale: Locale | string;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiSelect-select": {
    color: theme.palette.primary.contrastText,
    backgroundColor: "#000000",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.contrastText,
  },
  minWidth: "120px",
  margin: 2,
}));

const LanguageSelect = ({ locale }: LanguageProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSelectChange = (nextLocale: string) => {
    router.replace({ pathname, params } as any, {
      locale: nextLocale as Locale,
    });
  };

  if (!isMounted) {
    return null;
  }
  return (
    <StyledFormControl size="small">
      <Select
        labelId="language-select-label"
        value={locale}
        onChange={(e) => onSelectChange(e.target.value as string)}
      >
        {routing.locales.map((cur) => (
          <MenuItem key={cur} value={cur}>
            {languageNames[cur] || cur}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default LanguageSelect;
