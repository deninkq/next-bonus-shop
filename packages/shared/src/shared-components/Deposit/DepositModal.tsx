import { Dialog } from "@mui/material";
import DepositForm from "./DepositForm";

interface DepositModalProps {
  open: boolean;
  handleClose: () => void;
}

const DepositModal = ({ open, handleClose }: DepositModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <DepositForm handleClose={handleClose} />
    </Dialog>
  );
};

export default DepositModal;
