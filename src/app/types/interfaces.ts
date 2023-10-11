export interface Product {
  id: string;
  title: string;
  categoryId: string;
  image: string;
  rating: number;
  description: string;
  preparationTime: string;
  type: string;
  price: number;
  category: ProductCategory;
  activeMaterials: ActiveMaterial[];
  limitedMaterials: LimitedMaterial[];
  additionalSections: AdditionalSection[];
}
export interface ProductCategory {
  id: string;
  title: string;
  image: string;
  description: string;
  type: string;
  products: Product[];
}


export interface ActiveMaterial {
  name: string;
  quantity: number;
  price: number;
}

export interface LimitedMaterial {
  name: string;
  active: boolean;
}

export interface AdditionalSection {
  title: string;
  items: SelectableMaterial[];
}

export interface SelectableMaterial {
  name: string;
  active: boolean;
  price: number;
}

export interface Order {
  productName: string;
  orderPrice: number;
  activeMaterials: ActiveMaterial[];
  limitedMaterials: LimitedMaterial[];
  additionalSections: AdditionalSection[];
  orderNote: string;
}
