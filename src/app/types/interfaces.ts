export interface ActiveOrPassiveMaterial {
  name: string; 
  quantity?: number; 
  price: number; 
}

export interface ActiveOrPassiveMaterialLimited {
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
  materials: (ActiveOrPassiveMaterial | ActiveOrPassiveMaterialLimited)[];
}
export interface Order {
  productName: string;
  orderPrice: number;
  materials: (ActiveOrPassiveMaterial | ActiveOrPassiveMaterialLimited)[];
  orderNote: string;
}