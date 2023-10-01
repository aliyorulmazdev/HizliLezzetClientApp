import React, { CSSProperties, useState } from "react";
import { Fab, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { toast } from "react-toastify";

interface CallWaiterButtonProps {
  style?: CSSProperties;
}

const CallWaiterButton: React.FC<CallWaiterButtonProps> = ({ style }) => {
  const [isCallWaiterActive] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCallWaiterClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmCallWaiter = () => {
    setIsDialogOpen(false);
    toast.info("Waiter has been successfully called!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };
  

  return (
    <>
      <Fab
        variant="extended"
        color={"primary"}
        onClick={handleCallWaiterClick}
        size="small"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 2,
          ...style,
        }}
      >
        <HelpIcon sx={{ mr: 1 }} />
        Call Waiter
      </Fab>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Are you sure you want to call the waiter?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmCallWaiter} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CallWaiterButton;
