import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Order, SelectableMaterial } from "../../types/interfaces";
import {
  Box,
  ButtonGroup,
  Card,
  DialogContent,
  Divider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import "../../styles/ProductModal.css";
import { toast } from "react-toastify";
import { Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import ActiveProductMaterial from "./ActiveProductMaterial";
import LimitedProductMaterial from "./LimitedProductMaterial";
import AddionalProductSection from "./AddionalProductSection";

const ProductModal: React.FC = observer(() => {
  const {
    productStore,
    orderStore,
    restaurantSectionStore,
    restaurantTableStore,
    restaurantStore,
  } = useStore();

  const {
    handleMaterialSelect,
    toggleLimitedMaterial,
    decrementMaterialQuantity,
    incrementMaterialQuantity,
    closeModal,
  } = productStore;

  const handleOrderNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    orderStore.setOrderNote(e.target.value);
  };

  function generateGUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const submitOrder = () => {
    if (
      productStore.activeProduct &&
      productStore.activeProduct.activeMaterials &&
      productStore.activeProduct.limitedMaterials &&
      productStore.activeProduct.additionalSections
    ) {
      const currentOrder: Order = {
        isSelected: false,
        id: generateGUID(),
        productName: productStore.activeProduct.title || "",
        activeMaterials: productStore.activeProduct.activeMaterials,
        limitedMaterials: productStore.activeProduct.limitedMaterials,
        additionalSections: productStore.activeProduct.additionalSections
          .filter(
            (section) => productStore.selectedMaterials[section.title] !== null
          )
          .map((section) => ({
            title: section.title,
            items: [productStore.selectedMaterials[section.title]].filter(
              (item) => item !== null
            ) as SelectableMaterial[],
          })),
        restaurantId: restaurantStore.activeRestaurant?.id || "",
        sectionId: restaurantSectionStore.activeSection?.id || "",
        tableId: restaurantTableStore.activeTable?.id || "",
        orderPrice: productStore.totalPrice,
        orderNote: orderStore.orderNote || "",
      };

      orderStore.createOrder(currentOrder);
      const orderMessage = `"${currentOrder.productName}" successfully ordered for table ${currentOrder.tableId} `;
      toast.success(orderMessage, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      orderStore.orderNote = "";
      productStore.activeProduct = null;
      productStore.selectedMaterials = {};
      closeModal();
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Dialog
        open={productStore.isModalOpen}
        onClose={() => {
          closeModal();
        }}
        style={{ zIndex: 1 }}
        disableScrollLock={true}
      >
        <DialogContent className="custom-dialog-content">
          <DialogTitle>
            <div>
              <Typography>
                {productStore.activeProduct?.title} - $
                {productStore.totalPrice.toFixed(2)}
              </Typography>
              <Divider sx={{ borderBottomWidth: 3 }} />
            </div>
          </DialogTitle>

          <DialogContent>
            <DialogContent className="custom-dialog-content">
              <Image
                src={productStore.activeProduct?.image}
                alt={productStore.activeProduct?.title}
                className="product-image"
              />
            </DialogContent>
            <DialogContent className="custom-dialog-content">
              {productStore.activeProduct?.description}
            </DialogContent>

            <Card
              style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#fff5f5",
              }}
            >
              <Card
                style={{
                  padding: "20px",
                  margin: "10px",
                  backgroundColor: "#fff5f5",
                }}
              >
                {productStore.activeProduct?.activeMaterials?.map(
                  (material, index) => (
                    <ActiveProductMaterial
                      key={index}
                      material={material}
                      index={index}
                      incrementMaterialQuantity={incrementMaterialQuantity}
                      decrementMaterialQuantity={decrementMaterialQuantity}
                    />
                  )
                )}
              </Card>
            </Card>

            <Card
              style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#fffae6",
              }}
            >
              {productStore.activeProduct?.limitedMaterials?.map(
                (material, index) => (
                  <LimitedProductMaterial
                    key={index}
                    material={material}
                    index={index}
                    toggleLimitedMaterial={toggleLimitedMaterial}
                  />
                )
              )}
            </Card>
            <Card
              style={{
                padding: "20px",
                margin: "10px",
                backgroundColor: "#e6ffff",
                overflow: "visible",
              }}
            >
              {productStore.activeProduct?.additionalSections?.map(
                (section, sectionIndex) => (
                  <AddionalProductSection
                    key={sectionIndex}
                    section={section}
                    handleMaterialSelect={handleMaterialSelect}
                  />
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
            <Button size="large" color="error" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default ProductModal;
