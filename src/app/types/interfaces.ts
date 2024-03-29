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

export interface Restaurant {
  id: string;
  restaurantOwnerId: string;
  title: string;
  description: string;
  thumbnail: string;
  longitude: number;
  latitude: number;
  phoneNumber: string;
  email: string;
  address: string;
  workingStatus: string;
  isActive: boolean;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  creationDate: string;
  lastModifiedDate: string;
  isActiveWeb: boolean;
  isActiveLocal: boolean;
  isActiveGetirYemek: boolean;
  isActiveYemekSepeti: boolean;
  isActiveMigrosYemek: boolean;
  isActiveTrendyolYemek: boolean;
}

export interface RestaurantSection {
  id: string;
  restaurantId: string;
  tableKeyword: string;
  title: string;
  thumbnail: string;
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

export interface RestaurantTable {
  id: string;
  restaurantTableSectionId: string;
  variation: string;
  title: string;
  thumbnail: string;
}

export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  restaurantOwner: any; // Adjust the type according to the actual structure
  email: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  token: string;
}


export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}


export interface Order {
  id: string;
  ticketId: string;
  productName: string;
  orderPrice: number;
  restaurantId: string;
  tableId: string;
  sectionId: string;
  activeMaterials: ActiveMaterial[];
  limitedMaterials: LimitedMaterial[];
  additionalSections: AdditionalSection[];
  orderNote: string;
  isSelected: boolean;
}
