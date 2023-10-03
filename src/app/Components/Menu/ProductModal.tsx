import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import {
  Product,
  ActiveMaterial,
  LimitedMaterial,
  Order,
} from "../../types/interfaces";
import NumberInput from "../NumberInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ButtonGroup,
  Card,
  DialogContent,
  DialogContentText,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
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
  const [orderNote, setOrderNote] = useState("");
  const [tempProduct, setTempProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (open) {
      setTempProduct(product);
    }
  }, [open, product]);

  const activeMaterials: ActiveMaterial[] = product.activeMaterials;
  const limitedMaterials: LimitedMaterial[] = product.limitedMaterials;

  const [activeMaterialsState, setActiveMaterialsState] =
    useState<ActiveMaterial[]>(activeMaterials);
  const [limitedMaterialsState, setLimitedMaterialsState] =
    useState<LimitedMaterial[]>(limitedMaterials);

  useEffect(() => {
    const calculatedTotalPrice = activeMaterialsState.reduce(
      (total, material) => total + (material.quantity || 0) * material.price,
      0
    );
    const updatedTotalPrice = calculatedTotalPrice + product.price;
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

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrderNote(e.target.value);
  };

  const submitOrder = () => {
    if (tempProduct) {
      const currentOrder: Order = {
        productName: tempProduct.title,
        activeMaterials: activeMaterialsState,
        limitedMaterials: limitedMaterialsState,
        orderPrice: totalPrice,
        orderNote: orderNote,
      };

      const orderMessage = `"${currentOrder.productName}" ordered from Restoran: ${restoranid} - Table: ${masaid} - Total price is ${currentOrder.orderPrice} - OrderNote: ${orderNote}`;
      toast.success(orderMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      setActiveMaterialsState(
        activeMaterials.map((material) => ({ ...material, quantity: 0 }))
      );
      setLimitedMaterialsState(
        limitedMaterials.map((material) => ({ ...material, active: false }))
      );
      setTotalPrice(0);
      setOrderNote("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} style={{ zIndex: 1 }}>
      <DialogContent className="custom-dialog-content">
        <DialogTitle>{tempProduct?.title}</DialogTitle>
        <img
          src={tempProduct?.image}
          alt={tempProduct?.title}
          className="product-image"
        />
        <DialogContentText>{tempProduct?.description}</DialogContentText>
        <DialogTitle style={{ textAlign: "center" }}>
          Total Price: ${totalPrice.toFixed(2)}
        </DialogTitle>
        <DialogContent>
          <List>
            {activeMaterialsState.map((material, index) => (
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
            ))}

            {limitedMaterialsState.map((material, index) => (
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
                  size="large"
                  color={material.active ? "primary" : "error"}
                  onClick={() => toggleLimitedMaterial(index)}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "50px",
                    minWidth: "100px",
                    minHeight: "50px",
                  }}
                >
                  {material.active ? "Çıkar" : "Ekle"}
                </Button>
              </ListItem>
            ))}
          </List>
          <Card>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Order Note"
            value={orderNote}
            onChange={handleOrderNoteChange}
            style={{
              width: "100%",
              maxWidth: "100%",
              minWidth: "100%",
              resize: "none",
              borderRadius:'5px',
              border: 'none',
            }}
          />
          </Card>
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button color={"primary"} size="large" onClick={submitOrder}>
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
