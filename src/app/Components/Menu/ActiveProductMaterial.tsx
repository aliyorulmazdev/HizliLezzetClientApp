import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircle from "@mui/icons-material/AddCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import NumberInput from "../NumberInput";
import { ActiveMaterial } from "../../types/interfaces";

interface ActiveProductMaterialProps {
  material: ActiveMaterial;
  index: number;
  incrementMaterialQuantity: (index: number) => void;
  decrementMaterialQuantity: (index: number) => void;
}

const ActiveProductMaterial: React.FC<ActiveProductMaterialProps> = ({
  material,
  index,
  incrementMaterialQuantity,
  decrementMaterialQuantity,
}) => {
  return (
    <ListItem key={index}>
      <ListItemIcon>
        {material.quantity !== undefined && material.quantity <= 0 ? (
          <AddCircle color="error" />
        ) : (
          <ThumbUpAlt color="primary" />
        )}
      </ListItemIcon>
      <ListItemText>
        {material.name}
        <br />
        Price(per): ${material.price}
      </ListItemText>
      <NumberInput
        value={material.quantity ?? 0}
        onIncrement={() => incrementMaterialQuantity(index)}
        onDecrement={() => decrementMaterialQuantity(index)}
      />
    </ListItem>
  );
};

export default ActiveProductMaterial;
