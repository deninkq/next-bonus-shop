"use client";

import { Box, Button } from "@mui/material";
import DepositModal from "./DepositModal";
import { useEffect, useState } from "react";

interface DepositProps {
  buttonText: string;
}

const Deposit = ({ buttonText }: DepositProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        {buttonText}
      </Button>
      <DepositModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default Deposit;
