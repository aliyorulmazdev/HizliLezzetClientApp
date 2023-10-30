import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import OrderStore from "./orderStore";
import productCategoryStore from "./productCategoryStore";
import UserSettingsStore from "./userSettingsStore";
import RestaurantStore from "./restaurantStore"; // Eklenen satır
import RestaurantSectionStore from "./restaurantSectionStore"; // Eklenen satır
import RestaurantTableStore from "./restaurantTableStore"; // Eklenen satır

interface Store {
    productStore: ProductStore,
    orderStore: OrderStore,
    productCategoryStore: productCategoryStore,
    userSettingsStore: UserSettingsStore,
    restaurantStore: RestaurantStore, // Eklenen satır
    restaurantSectionStore: RestaurantSectionStore, // Eklenen satır
    restaurantTableStore: RestaurantTableStore, // Eklenen satır
}

export const store: Store = {
    productStore: new ProductStore(),
    orderStore: new OrderStore(),
    productCategoryStore: new productCategoryStore(),
    userSettingsStore: new UserSettingsStore(),
    restaurantStore: new RestaurantStore(), // Eklenen satır
    restaurantSectionStore: new RestaurantSectionStore(), // Eklenen satır
    restaurantTableStore: new RestaurantTableStore(), // Eklenen satır
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
