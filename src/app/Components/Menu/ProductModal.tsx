import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddCircle from "@mui/icons-material/AddCircle";
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt";
import { Order, SelectableMaterial } from "../../types/interfaces";
import NumberInput from "../NumberInput";
import ListItem from "@mui/material/ListItem";
import {
  Box,
  ButtonGroup,
  Card,
  DialogContent,
  DialogContentText,
  Divider,
  FormControl,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import "../../styles/ProductModal.css";
import { toast } from "react-toastify";
import { Dropdown, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = observer(
  ({ open, onClose }) => {
    const { customProductStore, orderStore } = useStore();
    const { rollbackProduct } = customProductStore;
    const activeProductCopy = { ...customProductStore.activeProduct };

    const {
      handleMaterialSelect,
      toggleLimitedMaterial,
      decrementMaterialQuantity,
      incrementMaterialQuantity,
    } = customProductStore;

    const handleOrderNoteChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      orderStore.setOrderNote(e.target.value);
    };

    const submitOrder = () => {
      if (
        activeProductCopy &&
        activeProductCopy.activeMaterials &&
        activeProductCopy.limitedMaterials &&
        activeProductCopy.additionalSections
      ) {
        const currentOrder: Order = {
          productName: activeProductCopy.title || "",
          activeMaterials: activeProductCopy.activeMaterials,
          limitedMaterials: activeProductCopy.limitedMaterials,
          additionalSections: activeProductCopy.additionalSections.map(
            (section) => ({
              title: section.title,
              items: [
                customProductStore.selectedMaterials[section.title],
              ].filter((item) => item !== null) as SelectableMaterial[],
            })
          ),
          orderPrice: customProductStore.totalPrice,
          orderNote: orderStore.orderNote || "",
        };

        orderStore.createOrder(currentOrder);
        const orderMessage = `"${currentOrder.productName}" Total price is ${currentOrder.orderPrice} - OrderNote: ${orderStore.orderNote}`;
        toast.success(orderMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        rollbackProduct();
        onClose();
      }
    };

    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Dialog
          open={open}
          onClose={() => {
            rollbackProduct();
            onClose();
          }}
          style={{ zIndex: 1 }}
          disableScrollLock={true}
        >
          <DialogContent className="custom-dialog-content">
            <DialogTitle>
              {activeProductCopy?.title} - $
              {customProductStore.totalPrice.toFixed(2)}
              <Divider sx={{ borderBottomWidth: 3 }} />
            </DialogTitle>
            <DialogContent>
              <DialogContent className="custom-dialog-content">
                <Image
                  src={activeProductCopy?.image}
                  alt={activeProductCopy?.title}
                  className="product-image"
                />
              </DialogContent>
              <DialogContent className="custom-dialog-content">
                {activeProductCopy?.description}
              </DialogContent>

              <Card
                style={{
                  padding: "20px",
                  margin: "10px",
                  backgroundColor: "#fff5f5",
                }}
              >
                {activeProductCopy?.activeMaterials?.map((material, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {material.quantity !== undefined &&
                      material.quantity <= 0 ? (
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
              </Card>
              <Card
                style={{
                  padding: "20px",
                  margin: "10px",
                  backgroundColor: "#fffae6",
                }}
              >
                {activeProductCopy?.limitedMaterials?.map((material, index) => (
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
                        textDecoration: material.active
                          ? "none"
                          : "line-through",
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
                ))}
              </Card>
              <Card
                style={{
                  padding: "20px",
                  margin: "10px",
                  backgroundColor: "#e6ffff",
                  overflow: "visible",
                }}
              >
                {activeProductCopy?.additionalSections?.map(
                  (section, sectionIndex) => (
                    <div key={sectionIndex} className="select-box-wrapper">
                      <DialogContentText className="custom-dialog-content">
                        {section.title}
                      </DialogContentText>
                      <FormControl fullWidth>
                        <Dropdown
                          className="dropdown"
                          selection
                          options={section.items.map((material, index) => ({
                            key: index,
                            value: material.name,
                            text: `${material.name} ($${material.price})`,
                          }))}
                          placeholder="Select from here"
                          onChange={(_, { value }) =>
                            handleMaterialSelect(section.title, value as string)
                          }
                        />
                      </FormControl>
                    </div>
                  )
                )}
              </Card>

              <Card
                style={{
                  padding: "20px",
                  margin: "10px",
                  backgroundColor: "#efefef",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Add Note to order here.."
                  value={orderStore.orderNote}
                  onChange={handleOrderNoteChange}
                  style={{
                    width: "100%",
                    resize: "none",
                    border: "none",
                    padding: "10px",
                    backgroundColor: "inherit",
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
      </Box>
    );
  }
);

export default ProductModal;
