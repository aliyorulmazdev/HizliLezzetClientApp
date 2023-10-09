import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import CardActionArea from "@mui/material/CardActionArea"; // Import CardActionArea
import { Product } from "../../types/interfaces";
import ProductModal from "./ProductModal";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = observer(({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { customProductStore } = useStore();

  const resetProductCardState = () => {
    customProductStore.resetActiveMaterials();
    customProductStore.resetLimitedMaterials();
    customProductStore.resetSelectedMaterials();
    customProductStore.resetTotalPrice();
  };

  const openModal = () => {
    resetProductCardState();
    customProductStore.rollbackProduct();
    customProductStore.createActiveProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    resetProductCardState();
    customProductStore.rollbackProduct();
    setModalOpen(false);
  };

  return (
    <div className="card-container">
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardActionArea sx={{ boxShadow: "none" }} onClick={openModal}>
          <CardHeader title={product.title} subheader={product.category} />
          <Rating
            name="product-rating"
            value={product.rating}
            readOnly
            precision={0.5}
          />
          <CardMedia
            component="img"
            height="194"
            image={product.image}
            alt={product.title}
            sx={{ borderRadius: "20px" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {product.description}😊
            </Typography>
            <div style={{ marginTop: "20px" }}>
              <Chip
                label={`${product.preparationTime} Preparation Time`}
                style={{ marginRight: "8px", backgroundColor: "#DAEEFF" }}
              />
              <Chip
                label={`${product.type}`}
                style={{ marginRight: "8px", backgroundColor: "#DAEEFF" }}
              />
              <Chip
                label={`${product.price}`}
                style={{ backgroundColor: "#FFD3D3" }}
              />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <ProductModal open={modalOpen} onClose={closeModal} />
    </div>
  );
});

export default ProductCard;
