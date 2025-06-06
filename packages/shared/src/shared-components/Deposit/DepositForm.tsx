"use client";

import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Grid, Button, Box, styled, TextField } from "@mui/material";

interface DepositFormProps {
  handleClose: () => void;
}

const StyledInput = styled(TextField)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
  marginTop: "4px",
}));

const DepositForm = ({ handleClose }: DepositFormProps) => {
  const [amount, setAmount] = useState("");
  const { user, deposit } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount)) {
      deposit(numAmount);
      setAmount("");
    }
    handleClose();
  };

  if (!user) return null;

  return (
    <Grid container>
      <Grid>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "20px",
            }}
          >
            <StyledInput
              placeholder="Enter Amount"
              type="number"
              value={amount}
              required
              onChange={(e) => setAmount(e.target.value)}
              inputProps={{ min: 0 }}
            />
            <Button type="submit" variant="contained">
              Deposit
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default DepositForm;
