import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Product, ProductCategory } from "../types/interfaces";

export default class productCategoryStore {
  productCategories: ProductCategory[] = [];
  loading = false;
  activeProductCategory: ProductCategory | null = null;
  product: Product | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  loadProductCategories = async () => {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const productCategories = await agent.ProductCategories.list();
      runInAction(() => {
        this.productCategories = productCategories;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createProductCategory = async (productCategory: ProductCategory) => {
    try {
      const createdProductCategory = await agent.ProductCategories.create(productCategory);
      this.productCategories.push(createdProductCategory);
    } catch (error) {
      console.error(error);
    }
  };

  updateProductCategory = async (productCategoryId: string, productCategory: ProductCategory) => {
    try {
      await agent.ProductCategories.update(productCategoryId, productCategory);
      const index = this.productCategories.findIndex((p) => p.id === productCategory.id);
      if (index !== -1) {
        this.productCategories[index] = productCategory;
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteProductCategory = async (productCategoryId: string) => {
    try {
      await agent.ProductCategories.delete(productCategoryId);
      this.productCategories = this.productCategories.filter((p) => p.id !== productCategoryId);
    } catch (error) {
      console.error(error);
    }
  };

  clearSelectedProduct = () => {
    runInAction(() => {
      this.activeProductCategory = null;
    });
  };

  createActiveProductCategory = (productCategory: ProductCategory) => {
    runInAction(() => {
      this.activeProductCategory = JSON.parse(JSON.stringify(productCategory));
    });
  };
}
