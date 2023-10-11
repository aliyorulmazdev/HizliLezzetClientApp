import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import OrderStore from "./orderStore";
import productCategoryStore from "./productCategoryStore";

interface Store {
    productStore: ProductStore,
    orderStore: OrderStore,
    productCategoryStore: productCategoryStore
}

export const store: Store = {
    productStore: new ProductStore(),
    orderStore: new OrderStore(),
    productCategoryStore: new productCategoryStore
}


export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}