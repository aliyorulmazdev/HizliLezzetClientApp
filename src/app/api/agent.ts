import { Product, ProductCategory } from "../types/interfaces";
import axios from "axios"; // axios kütüphanesini projeye ekleyin

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "https://raw.githubusercontent.com/aliyorulmazdev/HizliLezzetClientApp/main/public";
axios.interceptors.response.use((response) => {
  return sleep(10)
    .then(() => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
});
//#region PRODUCTS
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get("/products.json");
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
  productId: string,
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

const deleteProduct = async (productId: string): Promise<void> => {
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
//#endregion

//#region PRODUCT CATEGORY
const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  try {
    const response = await axios.get("/productCategories.json");
    if (response.status !== 200) {
      throw new Error("Error fetching productcategories");
    }
    const productCategoriesfromagent: ProductCategory[] = response.data;
    return productCategoriesfromagent;
  } catch (error) {
    console.error("Error fetching productcategories:", error);
    throw new Error("Error fetching productcategories");
  }
};

const createProductCategory = async (productCategory: ProductCategory): Promise<ProductCategory> => {
  try {
    const response = await axios.post("/productCategories.json", productCategory);
    if (response.status !== 201) {
      throw new Error("Error creating product category");
    }
    const createdProductCategory: ProductCategory = response.data;
    return createdProductCategory;
  } catch (error) {
    console.error("Error creating productCategory:", error);
    throw new Error("Error creating productCategory");
  }
};

const updateProductCategory = async (
  productCategoryId: string,
  updatedProductCategory: ProductCategory
): Promise<ProductCategory> => {
  try {
    const response = await axios.put(
      `/products/${productCategoryId}.json`,
      updatedProductCategory
    );
    if (response.status !== 200) {
      throw new Error("Error updating productCategory");
    }
    const updatedProductData: ProductCategory = response.data;
    return updatedProductData;
  } catch (error) {
    console.error("Error updating productCategory:", error);
    throw new Error("Error updating productCategory");
  }
};

const deleteProductCategory = async (productCategoryId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/products/${productCategoryId}.json`);
    if (response.status !== 204) {
      throw new Error("Error deleting productCategory");
    }
  } catch (error) {
    console.error("Error deleting productCategory:", error);
    throw new Error("Error deleting productCategory");
  }
};
//#endregion

const agent = {
  Products: {
    list: fetchProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
  },
  ProductCategories: {
    list: fetchProductCategories,
    create: createProductCategory,
    update: updateProductCategory,
    delete: deleteProductCategory,
  },
};
export default agent;
