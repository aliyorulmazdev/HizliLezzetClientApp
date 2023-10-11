import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useStore } from "../../stores/store";

interface ProductCategoryComponentProps {
  selectedCategoryIndex: number;
  handleCategoryChange: (event: React.SyntheticEvent, newIndex: number) => void;
}

const ProductCategoryComponent: React.FC<ProductCategoryComponentProps> = ({ selectedCategoryIndex, handleCategoryChange }) => {
  const { productCategoryStore } = useStore();

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={selectedCategoryIndex}
        onChange={handleCategoryChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {productCategoryStore.productCategories.map((category, index) => (
          <Tab key={index} label={category.title} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ProductCategoryComponent;
