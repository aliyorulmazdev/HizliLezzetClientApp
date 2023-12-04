import { makeAutoObservable } from "mobx";
import { Order } from "../types/interfaces";
import { toast } from "react-toastify";

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

  deleteOrder = (orderId: string) => {
    // Filter out the order to be deleted
    this.orders = this.orders.filter((order) => order.id !== orderId);

    toast.success(`Order deleted successfully.`, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
  };

  processPayment = (tableId: string) => {
    const ordersToPay = this.getOrdersByTableId(tableId);
    const totalAmount = ordersToPay.reduce(
      (acc, order) => acc + order.orderPrice,
      0
    );

    if (this.orders.length === 0) {
      toast.warning("No orders to pay for", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }

    toast.success(
      `Payment processed for table ${tableId}. Total amount: ₺${totalAmount}`,
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      }
    );

    this.resetOrders();
  };

  processSelectedItemsPayment = () => {
    const selectedOrders = this.orders.filter((order) => order.isSelected);

    if (selectedOrders.length === 0) {
      toast.warning("No selected items to pay for", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }

    const totalAmount = selectedOrders.reduce(
      (acc, order) => acc + order.orderPrice,
      0
    );

    toast.success(
      `Payment processed for selected items. Total amount: ₺${totalAmount}`,
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      }
    );

    this.orders = this.orders.filter((order) => !order.isSelected);
  };
}
