import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../styles/NumberInput.css";
interface NumberInputProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="small-textfield">
      <IconButton color='error' onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        value={value.toString()}
        variant="outlined"
        inputProps={{ style: { textAlign: "center" } }}
        className="small-textfield"
      />
      <IconButton color='primary' onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default NumberInput;
