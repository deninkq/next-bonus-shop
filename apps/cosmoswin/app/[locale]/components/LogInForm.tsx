"use client";

import { useEffect, useState } from "react";
import { useUser } from "@context/UserContext";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  styled,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

interface FormErrors {
  username?: string;
  fakeApi?: string;
}

const StyledPaper = styled(Paper)(() => ({
  padding: 20,
  height: "100%",
  width: 280,
  margin: "20px auto",
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
  marginTop: "4px",
}));

const LogInForm = () => {
  const [userName, setUserName] = useState("");
  const { login } = useUser();
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const translations = useTranslations("LogInForm");
  const locale = useLocale();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateClientSide = (value: string): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};

    if (!value.trim()) {
      newErrors.username = translations("errors.required");
      isValid = false;
    } else if (value.length < 4) {
      newErrors.username = translations("errors.minLength");
      isValid = false;
    } else if (value.length > 20) {
      newErrors.username = translations("errors.maxLength");
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      newErrors.username = translations("errors.invalidChars");
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserName(value);
    if (errors.fakeApi || errors.username) {
      setErrors({});
    }
    if (touched) {
      validateClientSide(value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateClientSide(userName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setHasSubmitted(true);
    setIsSubmitting(true);

    if (!validateClientSide(userName)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const loginSuccess = await login(userName);

      if (loginSuccess) {
        router.push(`/${locale}/bonus-shop`);
      } else {
        setErrors({
          fakeApi: translations("errors.notFound"),
        });
      }
    } catch (error) {
      console.log(error);
      setErrors({
        fakeApi: translations("errors.serverError"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) return null;

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container alignItems="center" flexDirection={"column"}>
          <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}></Avatar>
          <h2>{translations("title")}</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            label={translations("placeholder")}
            placeholder={translations("placeholder")}
            fullWidth
            required
            value={userName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(!!errors.username && touched) || !!errors.fakeApi}
            sx={{ marginBottom: errors.username || errors.fakeApi ? 0 : 2 }}
            disabled={isSubmitting}
          />
          {errors.username && touched && (
            <ErrorText>{errors.username}</ErrorText>
          )}
          {errors.fakeApi && hasSubmitted && <ErrorText>{errors.fakeApi}</ErrorText>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{
              marginTop: 2,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              translations("button")
            )}
          </Button>
        </form>
      </StyledPaper>
    </Grid>
  );
};

export default LogInForm;
