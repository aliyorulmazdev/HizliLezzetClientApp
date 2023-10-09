import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../types/interfaces";
import agent from "../api/agent";

export default class ProductStore {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const products = await agent.Products.list();

      runInAction(() => {
        this.products = products;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createProduct = async (product: Product) => {
    try {
      const createdProduct = await agent.Products.create(product);
      this.products.push(createdProduct);
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (productId: string, product: Product) => {
    try {
      await agent.Products.update(productId, product);
      const index = this.products.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteProduct = async (productId: string) => {
    try {
      await agent.Products.delete(productId);
      this.products = this.products.filter((p) => p.id !== productId);
    } catch (error) {
      console.error(error);
    }
  };

  clearSelectedProduct = () => {
    this.selectedProduct = null;
  };
}
