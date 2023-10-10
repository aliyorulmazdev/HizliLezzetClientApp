import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import { LimitedMaterial } from "../../types/interfaces";

interface LimitedProductMaterialProps {
  material: LimitedMaterial;
  index: number;
  toggleLimitedMaterial: (index: number) => void;
}

const LimitedProductMaterial: React.FC<LimitedProductMaterialProps> = ({
  material,
  index,
  toggleLimitedMaterial,
}) => {
  return (
    <ListItem key={index}>
      <ListItemIcon>
        {material.active ? (
          <ThumbUpAlt color="primary" />
        ) : (
          <AddCircle color="error" />
        )}
      </ListItemIcon>
      <ListItemText
        style={{
          textDecoration: material.active ? "none" : "line-through",
        }}
      >
        {material.name}
      </ListItemText>
      <Button
        variant="contained"
        size="small"
        color={material.active ? "primary" : "error"}
        onClick={() => toggleLimitedMaterial(index)}
      >
        {material.active ? "Remove" : "Add"}
      </Button>
    </ListItem>
  );
};

export default LimitedProductMaterial;
