import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RestaurantTable } from "../types/interfaces";

export default class RestaurantTableStore {
  restaurantTables: RestaurantTable[] = [];
  loading = false;
  activeTable: RestaurantTable | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadRestaurantTables = async () => {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const tables = await agent.RestaurantTables.list();
      runInAction(() => {
        this.restaurantTables = tables;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createRestaurantTable = async (table: RestaurantTable) => {
    try {
      const createdTable = await agent.RestaurantTables.create(table);
      this.restaurantTables.push(createdTable);
    } catch (error) {
      console.error(error);
    }
  };

  updateRestaurantTable = async (tableId: string, table: RestaurantTable) => {
    try {
      await agent.RestaurantTables.update(tableId, table);
      const index = this.restaurantTables.findIndex((t) => t.id === table.id);
      if (index !== -1) {
        this.restaurantTables[index] = table;
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteRestaurantTable = async (tableId: string) => {
    try {
      await agent.RestaurantTables.delete(tableId);
      this.restaurantTables = this.restaurantTables.filter((t) => t.id !== tableId);
    } catch (error) {
      console.error(error);
    }
  };

  clearSelectedTable = () => {
    runInAction(() => {
      this.activeTable = null;
    });
  };
}
