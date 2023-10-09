import { createContext, useContext } from "react";
import ProductStore from "./productStore";
import CustomProductStore from "./customProductStore";
import OrderStore from "./orderStore";

interface Store {
    productStore: ProductStore,
    customProductStore: CustomProductStore,
    orderStore: OrderStore
}

export const store: Store = {
    productStore: new ProductStore(),
    customProductStore: new CustomProductStore(),
    orderStore: new OrderStore(new CustomProductStore())
}


export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}