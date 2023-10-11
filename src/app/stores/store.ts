import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import OrderStore from "./orderStore";
import productCategoryStore from "./productCategoryStore";
import UserSettingsStore from "./userSettingsStore";

interface Store {
    productStore: ProductStore,
    orderStore: OrderStore,
    productCategoryStore: productCategoryStore,
    userSettingsStore: UserSettingsStore
}

export const store: Store = {
    productStore: new ProductStore(),
    orderStore: new OrderStore(),
    productCategoryStore: new productCategoryStore,
    userSettingsStore: new UserSettingsStore
}


export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}