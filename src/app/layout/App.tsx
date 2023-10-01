import { useEffect } from "react";
import { Grid } from "@mui/material";
import "./App.css";
import { observer } from "mobx-react-lite";
import Menu from "../Components/Menu/Menu";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";
import { ToastContainer } from "react-toastify"; // Toastr'ı içe aktarın
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { productStore } = useStore();

  useEffect(() => {
    productStore.loadProducts().then(() => {});
  }, [productStore]);

  return (
    <>
      <Grid container justifyContent="center">
        <h1>Vite + React</h1>
      </Grid>
      <Grid container justifyContent="center">
        <div className="card">
          <p>
            Latest Update:{" "}
            <code>ProductModal, Toastr, Axios, Mobx</code>
            <br />
            This is committed with VSCode on 01.10.2023
          </p>
        </div>
      </Grid>
      <ToastContainer />
      {productStore.loading ? (
        <LoadingComponent content="Loading app" />
      ) : (
        <Menu />
      )}
    </>
  );
}

export default observer(App);
