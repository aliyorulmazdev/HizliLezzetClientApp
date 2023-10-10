import { makeAutoObservable, runInAction } from "mobx";
import { Product, SelectableMaterial } from "../types/interfaces";
import agent from "../api/agent";

export default class ProductStore {
  products: Product[] = [];
  loading = false;
  activeProduct: Product | null = null;
  selectedMaterials: Record<string, SelectableMaterial | null> = {};
  totalPrice: number = 0;
  isModalOpen: boolean = false;

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
    runInAction(() => {
      this.activeProduct = null;
    });
  };

  createActiveProduct = (product: Product) => {
    runInAction(() => {
      if (this.activeProduct !== null) {
        const confirmUseDraft = window.confirm(
          "Daha önce oluşturulmuş bir taslak ürün bulunuyor. Bu taslağı kullanmak ister misiniz?"
        );

        if (confirmUseDraft) {
          this.activeProduct = {
            ...this.activeProduct,
            activeMaterials: this.activeProduct.activeMaterials || [],
            limitedMaterials: this.activeProduct.limitedMaterials || [],
            additionalSections: this.activeProduct.additionalSections || [],
          };
          this.calculateTotalPrice();
          return;
        }
      }

      this.activeProduct = {
        ...product,
        activeMaterials: product.activeMaterials || [],
        limitedMaterials: product.limitedMaterials || [],
        additionalSections: product.additionalSections || [],
      };
      this.totalPrice = product.price;
    });
  };
  incrementMaterialQuantity = (index: number) => {
    runInAction(() => {
      if (this.activeProduct) {
        const updatedMaterials = [...this.activeProduct.activeMaterials];
        updatedMaterials[index].quantity! += 1;
        this.activeProduct.activeMaterials = updatedMaterials;
        this.calculateTotalPrice();
      }
    });
  };

  decrementMaterialQuantity = (index: number) => {
    runInAction(() => {
      if (this.activeProduct) {
        const updatedMaterials = [...this.activeProduct.activeMaterials];
        if (updatedMaterials[index].quantity! > 0) {
          updatedMaterials[index].quantity! -= 1;
          this.activeProduct.activeMaterials = updatedMaterials;
          this.calculateTotalPrice();
        }
      }
    });
  };
  setMaterialSelection = (
    sectionTitle: string,
    selectedMaterial: SelectableMaterial | undefined
  ) => {
    runInAction(() => {
      this.selectedMaterials[sectionTitle] = selectedMaterial ?? null;
      this.calculateTotalPrice();
    });
  };

  toggleLimitedMaterial = (index: number) => {
    if (this.activeProduct) {
      const updatedMaterials = [...this.activeProduct.limitedMaterials];
      updatedMaterials[index].active = !updatedMaterials[index].active;
      runInAction(() => {
        this.activeProduct!.limitedMaterials = updatedMaterials;
        this.calculateTotalPrice();
      });
    }
  };
  handleMaterialSelect = (sectionTitle: string, selectedValue: string) => {
    runInAction(() => {
      const selectedMaterialInSection = this.activeProduct?.additionalSections
        .find((section) => section.title === sectionTitle)
        ?.items.find((material) => material.name === selectedValue);

      if (selectedMaterialInSection) {
        this.setMaterialSelection(sectionTitle, selectedMaterialInSection);
      } else {
        this.setMaterialSelection(sectionTitle, undefined);
      }
    });
  };
  resetActiveMaterials = () => {
    runInAction(() => {
      if (this.activeProduct) {
        this.activeProduct.activeMaterials = [];
        this.calculateTotalPrice();
      }
    });
  };

  resetLimitedMaterials = () => {
    runInAction(() => {
      if (this.activeProduct) {
        this.activeProduct.limitedMaterials = [];
        this.calculateTotalPrice();
      }
    });
  };

  resetSelectedMaterials = () => {
    runInAction(() => {
      if (this.activeProduct) {
        this.activeProduct.additionalSections.forEach((section) => {
          section.items = [];
        });
        this.calculateTotalPrice();
      }
    });
  };
  resetTotalPrice = () => {
    runInAction(() => {
      this.totalPrice = 0;
    });
  };

  calculateTotalPrice = () => {
    runInAction(() => {
      let totalPrice = this.activeProduct?.price || 0;

      if (this.activeProduct) {
        this.activeProduct.activeMaterials.forEach((material) => {
          totalPrice += material.price * (material.quantity || 0);
        });

        Object.values(this.selectedMaterials).forEach((selectedMaterial) => {
          if (selectedMaterial) {
            totalPrice += selectedMaterial.price;
          }
        });
      }
      this.totalPrice = totalPrice;
    });
  };
  openModal = (product: Product) => {
    runInAction(() => {
      this.clearSelectedProduct();
      this.createActiveProduct(product);
      this.isModalOpen = true;
    });
  };
  
  closeModal = () => {
    runInAction(() => {
      this.clearSelectedProduct();
      this.isModalOpen = false;
      this.activeProduct = null;
    });
  };
}
