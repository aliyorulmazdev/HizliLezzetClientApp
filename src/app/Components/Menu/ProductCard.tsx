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
          maxHeight: 380,
          minHeight: 380,
          backgroundColor: cardBackgroundColor,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "25px",
        }}
      >
        <CardActionArea sx={{ boxShadow: "none" }} onClick={openModal}>
          <CardHeader title={product.title} sx={{ color: cardTitleColor }} />
          <CardMedia
            component="img"
            height="194"
            image={product.image}
            alt={product.title}
            sx={{ borderRadius: "20px", position: "relative" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "130px",
              right: "10px",
              width: "100px",
              height: "50px",
              backgroundColor: "white",
              borderRadius: '20px',
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
            <div>
              <Chip
                label={`${product.preparationTime} Preparation Time`}
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
