import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import {
  Product,
  ActiveOrPassiveMaterial,
  ActiveOrPassiveMaterialLimited,
} from "../../types/interfaces";
import NumberInput from "../NumberInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ButtonGroup,
  DialogContent,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import "../../styles/ProductModal.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const { restoranid, masaid } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);

  const activeMaterials: ActiveOrPassiveMaterial[] = product.materials.filter(
    (material) => "quantity" in material
  ) as ActiveOrPassiveMaterial[];

  const limitedMaterials: ActiveOrPassiveMaterialLimited[] =
    product.materials.filter(
      (material) => "active" in material
    ) as ActiveOrPassiveMaterialLimited[];

  const [activeMaterialsState, setActiveMaterialsState] =
    useState(activeMaterials);

  const [limitedMaterialsState, setLimitedMaterialsState] =
    useState(limitedMaterials);

    useEffect(() => {
      // Calculate the total price based on active materials' quantities and prices
      const calculatedTotalPrice = activeMaterialsState.reduce(
        (total, material) => total + (material.quantity || 0) * material.price,
        0
      );
    
      // Add the product price to the calculatedTotalPrice
      const updatedTotalPrice = calculatedTotalPrice + product.price;
    
      // Ensure the updatedTotalPrice is a number
      setTotalPrice(updatedTotalPrice);
    }, [activeMaterialsState, product.price]);
    
    

  const incrementMaterialQuantity = (index: number) => {
    const updatedMaterials = [...activeMaterialsState];
    updatedMaterials[index].quantity! += 1;
    setActiveMaterialsState(updatedMaterials);
  };

  const decrementMaterialQuantity = (index: number) => {
    const updatedMaterials = [...activeMaterialsState];
    if (updatedMaterials[index].quantity! > 0) {
      updatedMaterials[index].quantity! -= 1;
      setActiveMaterialsState(updatedMaterials);
    }
  };

  const toggleLimitedMaterial = (index: number) => {
    const updatedMaterials = [...limitedMaterialsState];
    updatedMaterials[index].active = !updatedMaterials[index].active;
    setLimitedMaterialsState(updatedMaterials);
  };

  const submitOrder = () => {
    const orderDetails = {
      productName: product.title,
      productDescription: product.description,
      productPrice: product.price,
      activeMaterials: activeMaterialsState,
      limitedMaterials: limitedMaterialsState,
    };

    const orderMessage = `"${orderDetails.productName}" ordered from Restoran: ${restoranid} - Table: ${masaid}`;
    toast.success(orderMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ zIndex: 1 }}>
      <DialogContent className="custom-dialog-content">
        <DialogTitle>{product.title}</DialogTitle>
        <img src={product.image} alt={product.title} className="product-image" />
        <DialogTitle>{product.description}</DialogTitle>
        <DialogTitle>Price: {product.price}</DialogTitle>
        <DialogTitle>Materials:</DialogTitle>

        <List>
          {activeMaterialsState.map((material, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <AddCircle color="primary" />
              </ListItemIcon>
              <ListItemText>{material.name}</ListItemText>
              <NumberInput
                value={material.quantity || 0}
                onIncrement={() => incrementMaterialQuantity(index)}
                onDecrement={() => decrementMaterialQuantity(index)}
              />
            </ListItem>
          ))}
          {limitedMaterialsState.map((material, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <ThumbUpAlt color="primary" />
              </ListItemIcon>
              <ListItemText>{material.name}</ListItemText>
              <Button
                variant="contained"
                size="large"
                color={material.active ? "error" : "primary"}
                onClick={() => toggleLimitedMaterial(index)}
                style={{
                  maxWidth: "150px",
                  maxHeight: "50px",
                  minWidth: "150px",
                  minHeight: "50px",
                }}
              >
                {material.active ? "Çıkar" : "Ekle"}
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
      <DialogTitle>Total Price: ${totalPrice.toFixed(2)}</DialogTitle>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button size="large" onClick={submitOrder}>
            Order
          </Button>
          <Button size="large" color="error" onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
