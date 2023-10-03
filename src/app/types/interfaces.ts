export interface ActiveMaterial {
  name: string; 
  quantity?: number; 
  price: number; 
}

export interface LimitedMaterial {
  name: string; 
  active: boolean;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  preparationTime: string;
  type: string;
  price: number;
  activeMaterials: ActiveMaterial[]
  limitedMaterials: LimitedMaterial[]
}
export interface Order {
  productName: string;
  orderPrice: number;
  activeMaterials: ActiveMaterial[]
  limitedMaterials: LimitedMaterial[]
  orderNote: string;
}