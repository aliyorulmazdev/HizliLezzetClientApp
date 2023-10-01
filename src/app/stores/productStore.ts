import { makeAutoObservable } from "mobx";
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
    this.loading = true;
    try {
        const products = await agent.Products.list();
        this.products = products; // Tüm ürünleri yeniden yükle
        this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  };
}
