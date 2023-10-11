import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import CardActionArea from "@mui/material/CardActionArea";
import ProductModal from "./ProductModal";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Product } from "../../types/interfaces";
import { runInAction } from "mobx";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = observer(({ product }) => {
  const { productStore, userSettingsStore } = useStore();
  const [modalKey, setModalKey] = useState(0);

  const openModal = () => {
    runInAction(() => {
      productStore.activeProduct = null;
      const productCopy = { ...product };
      productStore.activeProduct = productCopy;
      productStore.openModal(productCopy);
    });
    setModalKey((prevKey) => prevKey + 1);
  };

  const cardBackgroundColor = userSettingsStore.productCardBackgroundColor;
  const cardTitleColor = userSettingsStore.productCardTitleColor;
  const cardDescriptionColor = userSettingsStore.productCardDescriptionColor;

  return (
    <div className="card-container">
      <Card
        className="card"
        sx={{
          maxWidth: 345,
          backgroundColor: cardBackgroundColor,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius:'25px'
        }}
      >
        <CardActionArea sx={{ boxShadow: "none" }} onClick={openModal}>
          <CardHeader title={product.title} sx={{ color: cardTitleColor }} />
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
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography
              variant="body2"
              color={cardDescriptionColor} // Açıklama rengini burada ayarlayın
            >
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
      <ProductModal key={modalKey} />
    </div>
  );
});

export default ProductCard;
