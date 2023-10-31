import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Restaurant, RestaurantSection, RestaurantTable } from "../types/interfaces";

export default class RestaurantStore {
  restaurants: Restaurant[] = [];
  restaurantSections: RestaurantSection[] = [];
  restaurantTables: RestaurantTable[] = [];
  loading = false;
  activeRestaurant: Restaurant | null = null;
  activeSection: RestaurantSection | null = null;
  activeTable: RestaurantTable | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadRestaurants = async () => {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const restaurants = await agent.Restaurants.list();
      runInAction(() => {
        this.restaurants = restaurants;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  loadRestaurantSections = async () => {
    runInAction(() => {
      this.loading = true;
    });

    try {
      const sections = await agent.RestaurantSections.list();
      runInAction(() => {
        this.restaurantSections = sections;
        this.loading = false;
      });
    } catch (error) {
      console.error(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

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

  createRestaurant = async (restaurant: Restaurant) => {
    try {
      const createdRestaurant = await agent.Restaurants.create(restaurant);
      this.restaurants.push(createdRestaurant);
    } catch (error) {
      console.error(error);
    }
  };

  createRestaurantSection = async (section: RestaurantSection) => {
    try {
      const createdSection = await agent.RestaurantSections.create(section);
      this.restaurantSections.push(createdSection);
    } catch (error) {
      console.error(error);
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

  clearSelectedRestaurant = () => {
    runInAction(() => {
      this.activeRestaurant = null;
    });
  };

  clearSelectedSection = () => {
    runInAction(() => {
      this.activeSection = null;
    });
  };

  clearSelectedTable = () => {
    runInAction(() => {
      this.activeTable = null;
    });
  };
}
