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
  Order,
} from "../../types/interfaces";
import NumberInput from "../NumberInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {
  ButtonGroup,
  DialogContent,
  DialogContentText,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import "../../styles/ProductModal.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useStore } from "../../stores/store";

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
  const [isOrderNoteOpen, setOrderNoteOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [editNote, setEditNote] = useState(false);
  const [tempProduct, setTempProduct] = useState<Product | null>(null);
  const {productStore} = useStore();
  useEffect(() => {
    if (open) {
      setTempProduct(product);
    }
  }, [open, product]);

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

  const openOrderNoteDialog = () => {
    setOrderNoteOpen(true);
  };

  const closeOrderNoteDialog = () => {
    setOrderNoteOpen(false);
  };

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrderNote(e.target.value);
  };

  const saveOrderNote = () => {
    setOrderNoteOpen(false);
  };

  const submitOrder = () => {
    if (tempProduct) {
      const currentOrder: Order = {
        productName: tempProduct.title,
        materials: tempProduct.materials,
        orderPrice: totalPrice,
        orderNote: orderNote,
      };

      const orderMessage = `"${currentOrder.productName}" ordered from Restoran: ${restoranid} - Table: ${masaid} - Total price is ${currentOrder.orderPrice}`;
      toast.success(orderMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      setActiveMaterialsState(activeMaterials);
      setLimitedMaterialsState(limitedMaterials);
      setTotalPrice(0);
      setOrderNote("");
      setEditNote(false);
      setTempProduct(null);
      productStore.loadProducts();
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
                <ListItemText
                  style={{
                    textDecoration:
                      (material.quantity ?? 0) <= 0 ? "line-through" : "none",
                  }}
                >
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
        </DialogContent>
      </DialogContent>
      <DialogActions>
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            color={editNote ? "error" : "primary"}
            size="large"
            onClick={openOrderNoteDialog}
          >
            Add/Edit Order Note
          </Button>
          <Button size="large" onClick={submitOrder}>
            Order
          </Button>
          <Button size="large" color="error" onClick={onClose}>
            Close
          </Button>
        </ButtonGroup>
      </DialogActions>
      <Dialog open={isOrderNoteOpen} onClose={closeOrderNoteDialog}>
        <DialogTitle>Order Note:</DialogTitle>
        <DialogContent>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
            value={orderNote}
            onChange={handleOrderNoteChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={saveOrderNote}>Save</Button>
          <Button onClick={closeOrderNoteDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ProductModal;
