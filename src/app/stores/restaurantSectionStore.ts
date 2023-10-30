import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { RestaurantSection } from "../types/interfaces";

export default class RestaurantSectionStore {
  restaurantSections: RestaurantSection[] = [];
  loading = false;
  activeSection: RestaurantSection | null = null;

  constructor() {
    makeAutoObservable(this);
  }

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

  createRestaurantSection = async (section: RestaurantSection) => {
    try {
      const createdSection = await agent.RestaurantSections.create(section);
      this.restaurantSections.push(createdSection);
    } catch (error) {
      console.error(error);
    }
  };

  updateRestaurantSection = async (sectionId: string, section: RestaurantSection) => {
    try {
      await agent.RestaurantSections.update(sectionId, section);
      const index = this.restaurantSections.findIndex((s) => s.id === section.id);
      if (index !== -1) {
        this.restaurantSections[index] = section;
      }
    } catch (error) {
      console.error(error);
    }
  };

  deleteRestaurantSection = async (sectionId: string) => {
    try {
      await agent.RestaurantSections.delete(sectionId);
      this.restaurantSections = this.restaurantSections.filter((s) => s.id !== sectionId);
    } catch (error) {
      console.error(error);
    }
  };

  clearSelectedSection = () => {
    runInAction(() => {
      this.activeSection = null;
    });
  };
}
