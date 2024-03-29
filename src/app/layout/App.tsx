import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import "./App.css";
import { observer } from "mobx-react-lite";
import Menu from "../Components/Menu/Menu";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RGBColorSelector from "../Components/RestaurantSettings/RGBColorSelector";

function App() {
  const { productStore, productCategoryStore, restaurantStore, restaurantSectionStore,restaurantTableStore } = useStore();

  useEffect(() => {
    productStore.loadProducts().then(() => {});
  }, [productStore]);
  
  useEffect(() => {
    productCategoryStore.loadProductCategories().then(() => {});
  }, [productCategoryStore]);

  useEffect(() => {
    restaurantStore.loadRestaurants().then(() => {});
  }, [restaurantStore]);

  useEffect(() => {
    restaurantSectionStore.loadRestaurantSections().then(() => {});
  }, [restaurantSectionStore]);

  useEffect(() => {
    restaurantTableStore.loadRestaurantTables().then(() => {});
  }, [restaurantTableStore]);
  
  const toastContainerStyle = {
    zIndex: 9999, // Set a high z-index value
  };
  return (
    <>
      <Grid container justifyContent="center">
        <h1>Vite + React</h1>
      </Grid>
      <Grid container justifyContent="center">
        <div className="card">
          <p>
            Latest Update:{" "}
            <code>
              userSettingsStore,TableComponent,TableApp, ProductModal, Toastr, Axios, Mobx
            </code>
            <br />
            This is committed with <code>VSCode</code> on 24.10.2023
          </p>
        </div>
      </Grid>
      <Box display="flex" justifyContent="center" marginTop="50px">
        <Button as={Link} variant="contained" to={"/restaurants"}>
          Try restaurant view
        </Button>
        <Button as={Link} variant="contained" to={"/restaurantPos"}>
          Try POS
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px"  marginBottom="20px">
        <RGBColorSelector />
      </Box>
      <ToastContainer style={toastContainerStyle} />
      {productStore.loading ? (
        <LoadingComponent content="Loading app" />
      ) : (
        <Menu />
      )}
    </>
  );
}

export default observer(App);
