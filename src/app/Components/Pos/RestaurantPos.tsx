import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Grid,
  MenuItem,
  MenuList,
  Typography,
  TextField,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useStore } from "../../stores/store";
import { Product, ProductCategory } from "../../types/interfaces";
import ProductModal from "../Menu/ProductModal";
import { runInAction } from "mobx";
import TableApp from "../../layout/TableApp";

const RestaurantPos: React.FC = observer(() => {
  const {
    productStore,
    productCategoryStore,
    restaurantSectionStore,
    orderStore,
    restaurantTableStore,
  } = useStore();
  const [searchText, setSearchText] = useState("");
  const [tableClicked, setTableClicked] = useState(false);

  const defaultCategory = productCategoryStore.productCategories[0] || null;
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(defaultCategory);

  const productsByCategory: { [categoryId: string]: Product[] } = {};
  const categoriesById: { [categoryId: string]: ProductCategory } = {};

  productStore.products.forEach((product) => {
    if (!productsByCategory[product.categoryId]) {
      productsByCategory[product.categoryId] = [];
    }
    productsByCategory[product.categoryId].push(product);
  });
  productsByCategory["0"] = productStore.products;

  productCategoryStore.productCategories.forEach((category) => {
    categoriesById[category.id] = category;
  });

  const handleTableClick = () => {
    setTableClicked(true);
  };

  const handleNegativeTableClick = () => {
    setTableClicked(false);
  };

  const handleCategorySelect = (category: ProductCategory) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const openModal = (product: Product) => {
    runInAction(() => {
      productStore.activeProduct = null;
      const productCopy = { ...product };
      productStore.activeProduct = productCopy;
      productStore.openModal(productCopy);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {tableClicked ? (
            <MenuList>
              {productCategoryStore.productCategories.map((category) => (
                <div key={category.id}>
                  <MenuItem
                    sx={{ textAlign: "left" }}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <Typography variant="body2">{category.title}</Typography>
                  </MenuItem>
                  <Divider />
                </div>
              ))}
            </MenuList>
          ) : (
            <MenuList>
              {restaurantSectionStore.restaurantSections.map((section) => (
                <div key={section.title}>
                  <MenuItem sx={{ textAlign: "left" }}>
                    <Typography variant="body2">{section.title}</Typography>
                  </MenuItem>
                  <Divider />
                </div>
              ))}
            </MenuList>
          )}
        </Grid>
        {tableClicked ? (
          <Grid item xs={7} justifyContent="center">
            <div>
              <TextField
                label="Arama"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={handleSearch}
              />
              {selectedCategory && (
                <Grid container justifyContent="center">
                  {productsByCategory[selectedCategory.id]
                    ?.filter((product) =>
                      product.title
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    )
                    .map((product) => (
                      <div key={product.id} style={{ margin: "10px", flex: 1 }}>
                        <Card
                          className="card"
                          sx={{
                            maxWidth: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "200px",
                            "@media (max-width: 600px)": {
                              flexDirection: "row",
                              height: "auto",
                              marginBottom: "10px",
                              minWidth: "200px",
                            },
                          }}
                        >
                          <CardActionArea
                            sx={{ boxShadow: "none" }}
                            onClick={() => openModal(product)}
                          >
                            <CardMedia
                              component="img"
                              image={product.image}
                              alt={product.title}
                              sx={{
                                position: "relative",
                                height: "150px",
                              }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: "0",
                                right: "0",
                                left: "0",
                                top: "0",
                                margin: "auto",
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
                              <Typography sx={{ fontWeight: "bold" }}>
                                {product.title}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                        <ProductModal />
                      </div>
                    ))}
                </Grid>
              )}
            </div>
          </Grid>
        ) : (
          <Grid item xs={7} justifyContent="center">
            <TableApp
              tableClicked={tableClicked}
              handleTableClick={handleTableClick}
            />
          </Grid>
        )}
        <Grid item xs={3}>
          {tableClicked ? (
            <MenuList>
              <MenuItem
                sx={{ textAlign: "left" }}
                onClick={handleNegativeTableClick}
              >
                <Typography variant="body2">Select Another Table</Typography>
              </MenuItem>
              <Divider />
              {orderStore
                .getOrdersByTableId(restaurantTableStore.activeTable!.id)
                .map((order) => (
                  <List>
                    <ListItem>
                    <FormControlLabel control={<Checkbox />} label={`${order.productName} - ₺${order.orderPrice}`} />

                      
                    </ListItem>
                    <Divider />
                  </List>
                ))}
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem
                sx={{ textAlign: "left" }}
                onClick={handleNegativeTableClick}
              >
                <Typography variant="body2">Select a table first</Typography>
              </MenuItem>
              <Divider />
            </MenuList>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

export default RestaurantPos;
