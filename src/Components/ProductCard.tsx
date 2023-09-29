import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { red } from "@mui/material/colors";
import { Product } from "../types/interfaces"; // interfaces dosyasından Product arayüzünü içe aktar

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card-container">
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>M</Avatar>}
          title={product.title}
          subheader={product.category}
        />
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Chip
            label={`${product.preparationTime} Preparation Time`}
            style={{ marginRight: "8px" }}
          />
          <Chip
            label={`${product.type}`}
            style={{ marginRight: "8px", backgroundColor: "#DAEEFF" }}
          />
          <Chip
            label={`${product.price}`}
            style={{ backgroundColor: "#FFD3D3" }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
