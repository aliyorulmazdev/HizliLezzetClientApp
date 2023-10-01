import { Product } from "../types/interfaces";
import axios from "axios"; // axios kütüphanesini projeye ekleyin

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "";
axios.interceptors.response.use((response) => {
  return sleep(2500)
    .then(() => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
});
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get("/products.json"); // axios ile GET isteği gönderin
    if (response.status !== 200) {
      throw new Error("Error fetching products");
    }
    const productsfromagent: Product[] = response.data;
    return productsfromagent;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Error fetching products");
  }
};

const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axios.post("/products.json", product);
    if (response.status !== 201) {
      throw new Error("Error creating product");
    }
    const createdProduct: Product = response.data;
    return createdProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Error creating product");
  }
};

const updateProduct = async (
  productId: number,
  updatedProduct: Product
): Promise<Product> => {
  try {
    const response = await axios.put(
      `/products/${productId}.json`,
      updatedProduct
    );
    if (response.status !== 200) {
      throw new Error("Error updating product");
    }
    const updatedProductData: Product = response.data;
    return updatedProductData;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Error updating product");
  }
};

const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const response = await axios.delete(`/products/${productId}.json`);
    if (response.status !== 204) {
      throw new Error("Error deleting product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Error deleting product");
  }
};

const agent = {
  Products: {
    list: fetchProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },
};
export default agent;
