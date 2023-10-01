import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";
import StepperComponent from "./StepperComponent";
import ProductCategoryComponent from "./ProductCategoryComponent";
import { useStore } from "../../stores/store"; // Store kullanımını ekleyin
import LoadingComponent from "../../layout/LoadingComponent";

const Menu = observer(() => {
  const { productStore } = useStore(); // Store'dan productStore'u alın

  return (
    <>
      <Grid
        container
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
        alignItems="center"
      >
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
                <ProductCard product={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
});

export default Menu;
