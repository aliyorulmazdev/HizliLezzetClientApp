// PaymentDialog.tsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  handlePaymentMethodSelect: (method: number) => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onClose,
  handlePaymentMethodSelect,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Payment Method</DialogTitle>
      <DialogContent>
        {/* Add buttons for each payment method */}
        <Button onClick={() => handlePaymentMethodSelect(1)}>
          Payment Method 1
        </Button>
        <Button onClick={() => handlePaymentMethodSelect(2)}>
          Payment Method 2
        </Button>
        <Button onClick={() => handlePaymentMethodSelect(3)}>
          Payment Method 3
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
