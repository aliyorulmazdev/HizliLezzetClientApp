import {
  LoginFormValues,
  LoginResponse,
  Product,
  ProductCategory,
  RegisterFormValues,
  Restaurant,
  RestaurantSection,
  RestaurantTable,
  User,
} from "../types/interfaces";
import axios from "axios"; // axios kütüphanesini projeye ekleyin

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// axios.defaults.baseURL = "https://raw.githubusercontent.com/aliyorulmazdev/HizliLezzetClientApp/main/public";
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

const createProductCategory = async (
  productCategory: ProductCategory
): Promise<ProductCategory> => {
  try {
    const response = await axios.post(
      "/productCategories.json",
      productCategory
    );
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

const deleteProductCategory = async (
  productCategoryId: string
): Promise<void> => {
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

//#region RESTAURANTS
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const response = await axios.get("/restaurants.json");
    if (response.status !== 200) {
      throw new Error("Error fetching restaurants");
    }
    const restaurantsFromAgent: Restaurant[] = response.data;
    return restaurantsFromAgent;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw new Error("Error fetching restaurants");
  }
};

const createRestaurant = async (
  restaurant: Restaurant
): Promise<Restaurant> => {
  try {
    const response = await axios.post("/restaurants.json", restaurant);
    if (response.status !== 201) {
      throw new Error("Error creating restaurant");
    }
    const createdRestaurant: Restaurant = response.data;
    return createdRestaurant;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw new Error("Error creating restaurant");
  }
};

const updateRestaurant = async (
  restaurantId: string,
  updatedRestaurant: Restaurant
): Promise<Restaurant> => {
  try {
    const response = await axios.put(
      `/restaurants/${restaurantId}.json`,
      updatedRestaurant
    );
    if (response.status !== 200) {
      throw new Error("Error updating restaurant");
    }
    const updatedRestaurantData: Restaurant = response.data;
    return updatedRestaurantData;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw new Error("Error updating restaurant");
  }
};

const deleteRestaurant = async (restaurantId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/restaurants/${restaurantId}.json`);
    if (response.status !== 204) {
      throw new Error("Error deleting restaurant");
    }
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw new Error("Error deleting restaurant");
  }
};
//#endregion

//#region RESTAURANT SECTIONS
const fetchRestaurantSections = async (): Promise<RestaurantSection[]> => {
  try {
    const response = await axios.get("/restaurantSections.json");
    if (response.status !== 200) {
      throw new Error("Error fetching restaurant sections");
    }
    const restaurantSectionsFromAgent: RestaurantSection[] = response.data;
    return restaurantSectionsFromAgent;
  } catch (error) {
    console.error("Error fetching restaurant sections:", error);
    throw new Error("Error fetching restaurant sections");
  }
};

const createRestaurantSection = async (
  restaurantSection: RestaurantSection
): Promise<RestaurantSection> => {
  try {
    const response = await axios.post(
      "/restaurantSections.json",
      restaurantSection
    );
    if (response.status !== 201) {
      throw new Error("Error creating restaurant section");
    }
    const createdRestaurantSection: RestaurantSection = response.data;
    return createdRestaurantSection;
  } catch (error) {
    console.error("Error creating restaurant section:", error);
    throw new Error("Error creating restaurant section");
  }
};

const updateRestaurantSection = async (
  sectionId: string,
  updatedRestaurantSection: RestaurantSection
): Promise<RestaurantSection> => {
  try {
    const response = await axios.put(
      `/restaurantSections/${sectionId}.json`,
      updatedRestaurantSection
    );
    if (response.status !== 200) {
      throw new Error("Error updating restaurant section");
    }
    const updatedSectionData: RestaurantSection = response.data;
    return updatedSectionData;
  } catch (error) {
    console.error("Error updating restaurant section:", error);
    throw new Error("Error updating restaurant section");
  }
};

const deleteRestaurantSection = async (sectionId: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `/restaurantSections/${sectionId}.json`
    );
    if (response.status !== 204) {
      throw new Error("Error deleting restaurant section");
    }
  } catch (error) {
    console.error("Error deleting restaurant section:", error);
    throw new Error("Error deleting restaurant section");
  }
};
//#endregion

//#region RESTAURANT TABLES
const fetchRestaurantTables = async (): Promise<RestaurantTable[]> => {
  try {
    const response = await axios.get("/restaurantTables.json");
    if (response.status !== 200) {
      throw new Error("Error fetching restaurant tables");
    }
    const restaurantTablesFromAgent: RestaurantTable[] = response.data;
    return restaurantTablesFromAgent;
  } catch (error) {
    console.error("Error fetching restaurant tables:", error);
    throw new Error("Error fetching restaurant tables");
  }
};

const createRestaurantTable = async (
  restaurantTable: RestaurantTable
): Promise<RestaurantTable> => {
  try {
    const response = await axios.post(
      "/restaurantTables.json",
      restaurantTable
    );
    if (response.status !== 201) {
      throw new Error("Error creating restaurant table");
    }
    const createdRestaurantTable: RestaurantTable = response.data;
    return createdRestaurantTable;
  } catch (error) {
    console.error("Error creating restaurant table:", error);
    throw new Error("Error creating restaurant table");
  }
};

const updateRestaurantTable = async (
  tableId: string,
  updatedRestaurantTable: RestaurantTable
): Promise<RestaurantTable> => {
  try {
    const response = await axios.put(
      `/restaurantTables/${tableId}.json`,
      updatedRestaurantTable
    );
    if (response.status !== 200) {
      throw new Error("Error updating restaurant table");
    }
    const updatedTableData: RestaurantTable = response.data;
    return updatedTableData;
  } catch (error) {
    console.error("Error updating restaurant table:", error);
    throw new Error("Error updating restaurant table");
  }
};

const deleteRestaurantTable = async (tableId: string): Promise<void> => {
  try {
    const response = await axios.delete(`/restaurantTables/${tableId}.json`);
    if (response.status !== 204) {
      throw new Error("Error deleting restaurant table");
    }
  } catch (error) {
    console.error("Error deleting restaurant table:", error);
    throw new Error("Error deleting restaurant table");
  }
};
//#endregion

//#region  USER

const Current = async (): Promise<User> => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("jwt");

    // Check if the token exists
    if (!token) {
      throw new Error("No token found");
    }

    // Set the authorization header with the Bearer token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the request with the headers
    const response = await axios.get("http://localhost:5000/api/v1/Authentication/WhoAmI", { headers });

    // Check if the response status is 200
    if (response.status !== 200) {
      throw new Error("Error fetching user information");
    }

    // Save the user data as per your requirements
    const user: User = response.data.value; // Assuming the user data is under "value" property

    // You can save the user data to your store or wherever needed
    // For example, store.commonStore.setUser(user);

    return user;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw new Error("Error fetching user information");
  }
};


// Function to handle login
const Login = async (loginFormValues: LoginFormValues): Promise<User> => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/Authentication/Login", loginFormValues);

    if (response.status !== 200) {
      throw new Error("Error during login");
    }

    // Save the JWT token in localStorage
    const jwtToken = response.data.value;
    console.log(jwtToken);
    localStorage.setItem("jwt", jwtToken);

    // Use the Current function to get user details
    const user = await Current();
    console.log(user);

    // You can save the user data to your store or wherever needed
    // For example, store.commonStore.setUser(user);

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Error during login");
  }
};


// Function to handle registration
const Register = async (registerFormValues: RegisterFormValues): Promise<User> => {
  try {
    const response = await axios.post("http://localhost:5000/api/v1/Authentication/Register", registerFormValues);

    if (response.status !== 200) {
      throw new Error("Error during registration");
    }

    // Proceed to login after successful registration
    const user = await Login({
      email: registerFormValues.email,
      password: registerFormValues.password,
    });

    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Error during registration");
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

  Account: {
    register: Register,
    login: Login,
    current: Current,
  },
  ProductCategories: {
    list: fetchProductCategories,
    create: createProductCategory,
    update: updateProductCategory,
    delete: deleteProductCategory,
  },
  Restaurants: {
    list: fetchRestaurants,
    create: createRestaurant,
    update: updateRestaurant,
    delete: deleteRestaurant,
  },
  RestaurantSections: {
    list: fetchRestaurantSections,
    create: createRestaurantSection,
    update: updateRestaurantSection,
    delete: deleteRestaurantSection,
  },
  RestaurantTables: {
    list: fetchRestaurantTables,
    create: createRestaurantTable,
    update: updateRestaurantTable,
    delete: deleteRestaurantTable,
  },
};
export default agent;
