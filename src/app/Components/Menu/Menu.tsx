import React, { useState, useRef, useEffect } from "react";
import { Grid, Divider, Typography, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import StepperComponent from "./StepperComponent";
import ProductCategoryComponent from "./ProductCategoryComponent";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import CallWaiterButton from "../CallWaiterButton";
import { Product, ProductCategory } from "../../types/interfaces";

const Menu: React.FC = observer(() => {
  const { productStore, productCategoryStore } = useStore();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const [showAllProducts] = useState(false);
  const endOfPageRef = useRef(null);

  const productsByCategory: { [categoryId: string]: Product[] } = {};

  productStore.products.forEach((product) => {
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = [];
    }
    productsByCategory[product.categoryId].push(product);
  });
  productsByCategory["0"] = productStore.products;

  const categoriesById: { [categoryId: string]: ProductCategory } = {};
  productCategoryStore.productCategories.forEach((category) => {
    categoriesById[category.id] = category;
  });

  const handleCategoryChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
  };

  const showMoreProducts = () => {
    setSelectedCategoryIndex((prevIndex) => (prevIndex + 1) % productCategoryStore.productCategories.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showMoreProducts();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, 
      }
    );

    if (endOfPageRef.current) {
      observer.observe(endOfPageRef.current);
    }

    return () => {
      if (endOfPageRef.current) {
        observer.unobserve(endOfPageRef.current);
      }
    };
  }, [endOfPageRef]);

  const selectedCategory = showAllProducts ? null : productCategoryStore.productCategories[selectedCategoryIndex];

  return (
    <>
      <Grid container justifyContent="center" sx={{ minHeight: "100vh" }} alignItems="center">
        <CallWaiterButton style={{ zIndex: 9999 }} />
        <Grid container justifyContent="center">
          <div style={{ marginBottom: "5px" }}>
            <StepperComponent />
          </div>
        </Grid>
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
              {showAllProducts ? (
                <Typography variant="h6" color="primary">
                  Tüm Ürünler
                </Typography>
              ) : (
                selectedCategory ? (
                  <Typography variant="h6" color="primary">
                    {selectedCategory.title}
                  </Typography>
                ) : (
                  <Typography variant="h6">Kategori bulunamadı</Typography>
                )
              )}
              <Grid container justifyContent="center" sx={{ gap: "15px" }}>
                {showAllProducts ? (
                  Object.values(productsByCategory).map((categoryProducts) =>
                    categoryProducts.map((product) => (
                      <Grid item key={product.id}>
                        <ProductCard key={product.id} product={product} />
                      </Grid>
                    ))
                  )
                ) : (
                  selectedCategory &&
                  productsByCategory[selectedCategory.id] &&
                  productsByCategory[selectedCategory.id].map((product) => (
                    <Grid item key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </Grid>
                  ))
                )}
              </Grid>
              <Divider sx={{ marginTop: 5, marginBottom: 0 }} />
              <Button onClick={showMoreProducts}>Devamını Göster</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <div ref={endOfPageRef} /> {/* Sayfanın sonu */}
    </>
  );
});

export default Menu;