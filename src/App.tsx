import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Product } from "./types/interfaces";
import ProductCard from "./Components/ProductCard";
import { Grid } from "@mui/material";
import StepperComponent from "./Components/StepperComponent";
import ProductCategoryComponent from "./Components/ProductCategoryComponent";

function App() {
  const product1: Product = {
    title: "Chicken Salad",
    category: "Salads",
    image:
      "https://deliverlogic-common-assets.s3.amazonaws.com/editable/images/callrc/menuitems/50748.jpg",
    rating: 3,
    description:
      "This chicken salad is a healthy and delicious option for any meal. Packed with tender, grilled chicken breast, crisp vegetables, and a zesty vinaigrette dressing, it's a refreshing choice that's perfect for lunch or dinner. Enjoy it as a light weekday lunch or as a satisfying addition to your dinner table. Bon appétit!",
    preparationTime: "30 Min",
    type: "Kitchen",
    price: "25$",
    materials: [
      { name: "Grilled Chicken", quantity: 0 },
      { name: "Crisp Vegetables", quantity: 0 },
      { name: "Zesty Vinaigrette Dressing", quantity: 5 },
      { name: "Passive Material", active: true },
      { name: "Limited Material 1",active: true},
      { name: "Limited Material 2" ,active: true},
    ],
  };
  
  const product2: Product = {
    title: "Caesar Salad",
    category: "Salads",
    image:
      "https://www.seriouseats.com/thmb/Fi_FEyVa3_-_uzfXh6OdLrzal2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg", // Replace with the actual image URL
    rating: 4.5,
    description:
      "Our Caesar Salad is a classic favorite. Made with fresh romaine lettuce, croutons, parmesan cheese, and our signature Caesar dressing, it's a delicious and satisfying choice. Whether you're having it as a side dish or a main course, our Caesar Salad is sure to please your taste buds.",
    preparationTime: "15 Min",
    type: "Kitchen",
    price: "$12.99",
    materials: [
      { name: "Romaine Lettuce", quantity: 0 },
      { name: "Croutons", quantity: 0 },
      { name: "Parmesan Cheese", quantity: 0 },
      { name: "Caesar Dressing", quantity: 0 },
      { name: "Passive Material" ,active: true},
      { name: "Limited Material 3",active: true }, 
    ],
  };
  
  
  
  

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
      alignItems="center"
    >
      <div>
        <a href="https://vitejs.dev" target="_blanPNNPk">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Grid container justifyContent="center">
      <h1>Vite + React</h1>
      </Grid>
      <Grid container justifyContent="center">
      <div className="card">
        <p>
          Latest Update: <code>ProductCard, Stepper, ProductCategoryComponent</code>
          <br />
          This is committed with <code>VSCode</code> on 30.09.2023
        </p>
      </div>
      </Grid>

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
        <Grid item>
          <ProductCard product={product1} />
        </Grid>
        <Grid item>
          <ProductCard product={product2} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
