import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import StepperComponent from "./StepperComponent";
import ProductCategoryComponent from "./ProductCategoryComponent";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../layout/LoadingComponent";
import CallWaiterButton from "../CallWaiterButton";

const Menu = observer(() => {
  const { productStore } = useStore();

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
        alignItems="center"
      >
        <CallWaiterButton style={{ zIndex: 9999 }} />
        <Grid container justifyContent="center">
          <div style={{ marginBottom: "5px" }}>
            <StepperComponent />
          </div>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <ProductCategoryComponent />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" sx={{ gap: "15px" }}>
          {productStore.loading ? (
            <LoadingComponent content="Loading products" />
          ) : (
            productStore.products.map((product) => (
              <Grid item key={product.id}>
                <ProductCard key={product.id} product={product}  />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default Menu;
