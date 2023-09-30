export interface ActiveOrPassiveMaterial {
  name: string;    // Malzeme adı (örneğin, domates, biber, patlıcan)
  quantity?: number; // Malzeme miktarı (isteğe bağlı)
}
export interface ActiveOrPassiveMaterialLimited {
  name: string;    // Malzeme adı (örneğin, domates, biber, patlıcan)
  active: boolean;  // Malzeme aktif veya pasif mi?
}


export interface Product {
  title: string;
  category: string;
  image: string;
  rating: number;
  description: string;
  preparationTime: string;
  type: string;
  price: string;
  materials: (ActiveOrPassiveMaterial | ActiveOrPassiveMaterialLimited)[]; // Malzemelerin listesi
}
