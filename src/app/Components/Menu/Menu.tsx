
import React, { useState } from "react";
import { Grid, Divider, Typography, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import ProductCategoryComponent from "./ProductCategoryComponent";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import CallWaiterButton from "../CallWaiterButton";
import { Product, ProductCategory } from "../../types/interfaces";

const Menu: React.FC = observer(() => {
  const { productStore, productCategoryStore } = useStore();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const productsByCategory: { [categoryId: string]: Product[] } = {};

  productStore.products.forEach((product) => {
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = [];
    }
    productsByCategory[product.categoryId].push(product);
  });
  //Add all products to "0" Category(All Products)
  productsByCategory["0"] = productStore.products;

  const categoriesById: { [categoryId: string]: ProductCategory } = {};
  productCategoryStore.productCategories.forEach((category) => {
    categoriesById[category.id] = category;
  });

  const handleCategoryChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
  };

  const showMoreProducts = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setSelectedCategoryIndex((prevIndex) => (prevIndex + 1) % productCategoryStore.productCategories.length);
  };
  

  const selectedCategory = productCategoryStore.productCategories[selectedCategoryIndex];

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <CallWaiterButton style={{ zIndex: 9999 }} />
        <Grid container justifyContent="center">
          <Grid item>
            <ProductCategoryComponent
              selectedCategoryIndex={selectedCategoryIndex}
              handleCategoryChange={handleCategoryChange}
            />
          </Grid>

        </Grid>
        <Grid container justifyContent="center" sx={{ gap: "15px" }}>
          {productStore.loading ? (
            <LoadingComponent content="Loading products" />
          ) : (
            <Grid item>
              {selectedCategory ? (
                <Typography variant="h6" color="primary">
                  {selectedCategory.title}
                </Typography>
              ) : (
                <Typography variant="h6">Category not found</Typography>
                
              )}
              <Grid container justifyContent="center" sx={{ gap: "15px" }}>
                {selectedCategory && productsByCategory[selectedCategory.id] ? (
                  productsByCategory[selectedCategory.id].map((product) => (
                    <Grid item key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="h6">Products not found</Typography>
                  
                )}
              </Grid>
              <Divider sx={{ marginTop: 5, marginBottom: 0 }} />
              <Button onClick={showMoreProducts}>Show More</Button>
              
            </Grid>
          )}
        </Grid>
      </Grid>

    </>
  );
});

export default Menu;
