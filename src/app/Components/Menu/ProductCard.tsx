import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CardActionArea from "@mui/material/CardActionArea";
import ProductModal from "./ProductModal";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import "../../styles/ProductCard.css";
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
  const cardBorderRadius = userSettingsStore.productCardBorderRadius;
  const cardPhotoHeight = userSettingsStore.productCardPhotoHeight;

  return (
    <div className="card-container">
      <Card
        className="shine-effect"
        sx={{
          maxWidth: 300,
          maxHeight: 375,
          minHeight: 375,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: `${cardBorderRadius}px`,
        }}
      >
        <CardActionArea sx={{ boxShadow: "none" }} onClick={openModal}>
          <CardHeader
            title={product.title}
            sx={{ color: cardTitleColor, textAlign: "center" }}
          />
          <CardMedia
            component="img"
            height={cardPhotoHeight}
            image={product.image}
            alt={product.title}
            sx={{ borderRadius: "50px", position: "relative" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "140px",
              right: "20px",
              width: "100px",
              height: "50px",
              backgroundColor: "white",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography
              variant="body2"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            >
              PRICE: ${product.price}
            </Typography>
          </div>
          <CardContent
            sx={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body2"
              color={cardDescriptionColor}
              style={{
                height: "4em",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              {product.description}😊
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Chip
                label={`Ready in ${product.preparationTime}`}
                style={{ marginBottom: "8px", backgroundColor: "#DAEEFF" }}
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
