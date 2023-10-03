export interface Product {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  preparationTime: string;
  type: string;
  price: number;
  activeMaterials: ActiveMaterial[];
  limitedMaterials: LimitedMaterial[];
  additionalSections: AdditionalSection[];
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
