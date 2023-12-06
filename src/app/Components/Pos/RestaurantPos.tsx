import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
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
  CardContent,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Button,
  ButtonGroup,
  IconButton,
  Badge,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useStore } from "../../stores/store";
import { Product, ProductCategory } from "../../types/interfaces";
import ProductModal from "../Menu/ProductModal";
import { runInAction } from "mobx";
import TableApp from "../../layout/TableApp";
import { ToastContainer } from "react-toastify";
import { CardHeader, Image } from "semantic-ui-react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PaymentDialog from "./PaymentDialog";

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
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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

  const openPaymentModal = () => {
    setPaymentModalOpen(true);
  };
  

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  let totalOrderPrice = 0;
  let totalSelectedOrdersPrice = 0;

  if (restaurantTableStore.activeTable) {
    const orders = orderStore.getOrdersByTableId(
      restaurantTableStore.activeTable.id
    );

    totalOrderPrice = orders.reduce(
      (total, order) => total + order.orderPrice,
      0
    );

    const selectedOrders = orders.filter((order) => order.isSelected);
    totalSelectedOrdersPrice = selectedOrders.reduce(
      (total, order) => total + order.orderPrice,
      0
    );
  } else {
    // Handle the situation when there is no active table.
    console.log("No active table found.");
  }
  const generateStarIcons = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} color="primary" fontSize="small" />);
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalfIcon key={fullStars} color="primary" fontSize="small" />
      );
    }

    return stars;
  };

  const openModal = (product: Product) => {
    runInAction(() => {
      productStore.activeProduct = null;
      const productCopy = { ...product };
      productStore.activeProduct = productCopy;
      productStore.openModal(productCopy);
    });
  };

  const handleCheckboxChange = (orderId: string) => {
    // Find the order in the orders array
    const updatedOrders = orderStore.orders.map((order) =>
      order.id === orderId ? { ...order, isSelected: !order.isSelected } : order
    );

    // Update the orders in the store
    orderStore.orders = updatedOrders;
    
  };

  const handlePaymentMethodSelect = (method: number | null) => {
    setSelectedPaymentMethod(method as null);
    setPaymentModalOpen(false);
  
    // Perform the payment logic based on the selected method
    // You can add your payment processing logic here
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ToastContainer />
          {tableClicked ? (
            <MenuList>
              {productCategoryStore.productCategories.map((category) => [
                <MenuItem
                  key={category.id}
                  sx={{ textAlign: "left" }}
                  onClick={() => handleCategorySelect(category)}
                >
                  <Typography variant="body2">{category.title}</Typography>
                </MenuItem>,
                <Divider key={`divider-${category.id}`} />,
              ])}
            </MenuList>
          ) : (
            <MenuList>
              {restaurantSectionStore.restaurantSections.map((section) => [
                <MenuItem key={section.title} sx={{ textAlign: "left" }}>
                  <Typography variant="body2">{section.title}</Typography>
                </MenuItem>,
                <Divider key={`divider-${section.title}`} />,
              ])}
            </MenuList>
          )}
        </Grid>
        {tableClicked ? (
          <Grid item xs={7} justifyContent="center">
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
                    <React.Fragment key={product.id}>
                      <Card
                        key={product.id}
                        sx={{
                          minWidth: 275,
                          borderRadius: 5,
                          margin: "10px",
                          flex: 1,
                        }}
                      >
                        <CardActionArea
                          sx={{ boxShadow: "none" }}
                          onClick={() => openModal(product)}
                        >
                          <CardHeader>
                            <Image
                              src={product.image}
                              size="large"
                              style={{
                                height: "200px", // Set the desired height here
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </CardHeader>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {product.title}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            ></Typography>
                            <Typography variant="body2">
                              {product.description}
                            </Typography>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Typography variant="subtitle1" color="primary">
                                {generateStarIcons(product.rating)}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                {product.price}$ / piece
                              </Typography>
                            </Stack>
                            <Typography
                              sx={{
                                color: "text.secondary",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end", // Align content to the right
                              }}
                            >
                              Ready in {product.preparationTime}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      <ProductModal />
                    </React.Fragment>
                  ))}
              </Grid>
            )}
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
              <List>
                {orderStore
                  .getOrdersByTableId(restaurantTableStore.activeTable!.id)
                  .map((order) => {
                    const product = productStore.products.find(
                      (product) => product.title === order.productName
                    );

                    if (!product) {
                      // Handle the case where the product is not found
                      return null;
                    }
                    return (
                      <React.Fragment key={order.id}>
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              {order.isSelected ? (
                                <Typography color="inherit">
                                  <strong>Selected Order Details:</strong>
                                </Typography>
                              ) : (
                                <Typography color="inherit">
                                  <strong>Order Details:</strong>
                                </Typography>
                              )}
                              <Typography variant="body2" color="inherit">
                                Product: {order.productName}
                              </Typography>
                              <Typography variant="body2" color="inherit">
                                Order Price: ₺{order.orderPrice}
                              </Typography>
                              {order.orderNote && (
                                <Typography variant="body2" color="inherit">
                                  Order Note: {order.orderNote}
                                </Typography>
                              )}

                              {/* Add details for ActiveMaterials with quantity >= 1 only if true */}
                              {order.activeMaterials?.filter(
                                (material) => material.quantity >= 1
                              ).length > 0 && (
                                <Typography variant="body2" color="inherit">
                                  Active Materials:{" "}
                                  {order.activeMaterials
                                    .filter(
                                      (material) => material.quantity >= 1
                                    )
                                    .map(
                                      (material) =>
                                        `${material.name} (${material.quantity} * ₺${material.price})`
                                    )
                                    .join(", ")}
                                </Typography>
                              )}

                              {order.limitedMaterials?.filter(
                                (material) => material.active
                              ).length > 0 && (
                                <Typography variant="body2" color="inherit">
                                  Limited Materials:{" "}
                                  {order.limitedMaterials
                                    .filter((material) => material.active)
                                    .map((material) => material.name)
                                    .join(", ")}
                                </Typography>
                              )}
                              {order.additionalSections &&
                                order.additionalSections.length > 0 && (
                                  <>
                                    <Typography variant="body2" color="inherit">
                                      {order.additionalSections
                                        .map((section, index) => {
                                          const itemsText =
                                            section.items &&
                                            section.items
                                              .filter(
                                                (item) =>
                                                  item &&
                                                  item.name !== null &&
                                                  item.name.trim() !== ""
                                              )
                                              .map((item) => {
                                                if (item.price) {
                                                  return `${item.name} - ₺${item.price}`;
                                                }
                                                return item.name;
                                              })
                                              .join(", ");

                                          return itemsText
                                            ? index === 0
                                              ? `Additional Sections: ${section.title} - ${itemsText}`
                                              : `${section.title} - ${itemsText}`
                                            : null;
                                        })
                                        .filter(Boolean) // Filtrelenen boş değerleri temizle
                                        .join(", ")}
                                    </Typography>
                                  </>
                                )}

                              {/* Add more order details as needed */}
                            </React.Fragment>
                          }
                        >
                          <ListItem sx={{ justifyContent: "space-between" }}>
                            <ListItemAvatar>
                              <Avatar src={product.image} alt={product.title} />
                            </ListItemAvatar>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={order.isSelected}
                                  onChange={() =>
                                    handleCheckboxChange(order.id)
                                  }
                                />
                              }
                              label={`${product.title} - ₺${order.orderPrice}`}
                            />
                            <IconButton
                              aria-label="delete"
                              size="large"
                              color="primary"
                              onClick={() => orderStore.deleteOrder(order.id)}
                              style={{ marginLeft: "auto" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </ListItem>
                        </HtmlTooltip>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
              </List>

              <ButtonGroup style={{ marginTop: "20px" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      openPaymentModal();
                      orderStore.processPayment(
                        restaurantTableStore.activeTable!.id
                      )
                    }
                      
                    }
                    disabled={
                      !orderStore.getOrdersByTableId(
                        restaurantTableStore.activeTable!.id
                      ).length
                    }
                  >
                    Full Payment
                  </Button>
                  {orderStore.getOrdersByTableId(
                    restaurantTableStore.activeTable!.id
                  ).length > 0 && (
                    <Badge
                      color="primary"
                      badgeContent={`₺${totalOrderPrice}`}
                      overlap="circular"
                      style={{ position: "absolute", top: 0, right: 0 }}
                    />
                  )}
                </div>

                <div style={{ position: "relative", display: "inline-block" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      openPaymentModal();
                      orderStore.processSelectedItemsPayment()
                    } }
                    disabled={
                      !orderStore
                        .getOrdersByTableId(
                          restaurantTableStore.activeTable!.id
                        )
                        .some((order) => order.isSelected)
                    }
                  >
                    Pay for Selected
                  </Button>
                  {orderStore
                    .getOrdersByTableId(restaurantTableStore.activeTable!.id)
                    .some((order) => order.isSelected) && (
                    <Badge
                      color="error"
                      badgeContent={`₺${totalSelectedOrdersPrice}`}
                      overlap="circular"
                      style={{ position: "absolute", top: 0, right: 0 }}
                    />
                  )}
                </div>
              </ButtonGroup>
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
      <PaymentDialog
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        handlePaymentMethodSelect={handlePaymentMethodSelect}
      />
    </Box>
    
  );
});

export default RestaurantPos;
