import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Product } from "./types/interfaces";
import ProductCard from "./Components/ProductCard";

function App() {
  const [count, setCount] = useState(0);
  const product: Product = {
    title: "Chicken Salad",
    category: "Salads",
    image:
      "https://deliverlogic-common-assets.s3.amazonaws.com/editable/images/callrc/menuitems/50748.jpg",
    description:
      "This chicken salad is a healthy and delicious option for any meal. Packed with tender, grilled chicken breast, crisp vegetables, and a zesty vinaigrette dressing, it's a refreshing choice that's perfect for lunch or dinner. Enjoy it as a light weekday lunch or as a satisfying addition to your dinner table. Bon appétit!",
    preparationTime: "30 Min",
    type: "Kitchen",
    price: "50$",
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blanPNNPk">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Vite + React + GithubActions + Azure + MSSQL + .Net Core Web API ♥ ♡
        Kübra ♥ ♡
        This is commited with VSCODE on 29.09.2023
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Latest Update: <code>ProductCard</code>
        </p>
      </div>
      <center>
        <ProductCard product={product} />
      </center>
    </>
  );
}

export default App;
