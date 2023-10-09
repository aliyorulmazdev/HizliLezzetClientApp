import { makeAutoObservable } from "mobx";
import {
  ActiveMaterial,
  LimitedMaterial,
  Product,
  SelectableMaterial,
} from "../types/interfaces";

export default class CustomProductStore {
  activeProduct: Product | null = null;
  initialProductBackup: Product | null = null;
  activeMaterialsState: ActiveMaterial[] = [];
  limitedMaterialsState: LimitedMaterial[] = [];
  selectedMaterials: Record<string, SelectableMaterial | null> = {};
  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setMaterialSelection(
    sectionTitle: string,
    selectedMaterial: SelectableMaterial | undefined
  ) {
    this.selectedMaterials[sectionTitle] = selectedMaterial ?? null;
    this.calculateTotalPrice();
  }

  createActiveProduct = (product: Product) => {
    this.initialProductBackup = { ...product };

    this.activeProduct = {
      ...product,
      activeMaterials: product.activeMaterials || [],
      limitedMaterials: product.limitedMaterials || [],
      additionalSections: product.additionalSections || [],
    };
    this.totalPrice = product.price;
  };

  incrementMaterialQuantity = (index: number) => {
    if (this.activeProduct) {
      const updatedMaterials = [...this.activeProduct.activeMaterials];
      updatedMaterials[index].quantity! += 1;
      this.activeProduct.activeMaterials = updatedMaterials;
      this.calculateTotalPrice();
    }
  };

  decrementMaterialQuantity = (index: number) => {
    if (this.activeProduct) {
      const updatedMaterials = [...this.activeProduct.activeMaterials];
      if (updatedMaterials[index].quantity! > 0) {
        updatedMaterials[index].quantity! -= 1;
        this.activeProduct.activeMaterials = updatedMaterials;
        this.calculateTotalPrice();
      }
    }
  };

  toggleLimitedMaterial = (index: number) => {
    if (this.activeProduct) {
      const updatedMaterials = [...this.activeProduct.limitedMaterials];
      updatedMaterials[index].active = !updatedMaterials[index].active;
      this.activeProduct.limitedMaterials = updatedMaterials;
      this.calculateTotalPrice();
    }
  };
  rollbackProduct = () => {
    if (this.initialProductBackup && this.activeProduct) {
      this.activeProduct = { ...this.initialProductBackup }; // Kopya ürünü geri yükle
      this.activeMaterialsState = [];
      this.limitedMaterialsState = [];
      this.calculateTotalPrice(); // Toplam fiyatı yeniden hesapla
    }
  };

  handleMaterialSelect = (sectionTitle: string, selectedValue: string) => {
    const selectedMaterialInSection = this.activeProduct?.additionalSections
      .find((section) => section.title === sectionTitle)
      ?.items.find((material) => material.name === selectedValue);

    if (selectedMaterialInSection) {
      this.setMaterialSelection(sectionTitle, selectedMaterialInSection);
    } else {
      this.setMaterialSelection(sectionTitle, undefined);
    }
  };

  resetActiveMaterials = () => {
    if (this.activeProduct) {
      this.activeProduct.activeMaterials = [];
    }
  };

  resetLimitedMaterials = () => {
    if (this.activeProduct) {
      this.activeProduct.limitedMaterials = [];
    }
  };

  resetSelectedMaterials = () => {
    if (this.activeProduct) {
      this.activeProduct.additionalSections.forEach((section) => {
        section.items = [];
      });
    }
  };

  resetTotalPrice = () => {
    this.totalPrice = 0;
  };

  calculateTotalPrice = () => {
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
  };
}
