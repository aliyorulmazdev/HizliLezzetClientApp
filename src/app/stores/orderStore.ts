import { makeAutoObservable } from "mobx";
import { Order, Product } from "../types/interfaces";
import CustomProductStore from "./customProductStore";

export default class OrderStore {
  orders: Order[] = [];
  orderNote: string = "";
  customProductStore: CustomProductStore;

  constructor(customProductStore: CustomProductStore) {
    makeAutoObservable(this);
    this.customProductStore = customProductStore;
  }

  createOrder = (order: Order) => {
    this.orders.push(order);
  };

  setOrderNote = (note: string) => {
    this.orderNote = note;
  };

  resetOrders = () => {
    this.orders = [];
  };
}

