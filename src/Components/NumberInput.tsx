import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../styles/NumberInput.css";

// Define a TypeScript interface for the props
interface NumberInputProps {
  value: number; // Specify the type for the 'value' prop
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
      <IconButton onClick={onDecrement}>
        <RemoveIcon />
      </IconButton>
      <TextField
        value={value.toString()} // value prop'unu string olarak dönüştürün
        variant="outlined"
        inputProps={{ style: { textAlign: "center" } }}
        className="small-textfield"
      />

      <IconButton onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default NumberInput;
