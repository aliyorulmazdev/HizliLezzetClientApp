import { makeAutoObservable } from "mobx";
import { Order } from "../types/interfaces";

export default class OrderStore {
  orders: Order[] = [];
  orderNote: string = "";

  constructor() {
    makeAutoObservable(this);
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

  getOrdersByTableId = (tableId: string) => {
    return this.orders.filter((order) => order.tableId === tableId);
  };
}
