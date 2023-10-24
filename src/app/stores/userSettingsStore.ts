import { makeAutoObservable, runInAction } from "mobx";

export default class UserSettingsStore {
  productCardBackgroundColor: string = '#eeeeee';
  productCardTitleColor: string = "white";
  productCardDescriptionColor: string = "white";
  productCardBorderRadius: number = 50;
  productCardPhotoHeight: number = 200;

  constructor() {
    makeAutoObservable(this);
  }

  setProductCardColor = (colorType: "background" | "title" | "description", color: string) => {
    runInAction(() => {
      switch (colorType) {
        case "background":
          this.productCardBackgroundColor = color;
          break;
        case "title":
          this.productCardTitleColor = color;
          break;
        case "description":
          this.productCardDescriptionColor = color;
          break;
        default:
          console.error("Geçersiz colorType");
          break;
      }
    });
  };

  setProductCardBorderRadius = (radius: number) => {
    runInAction(() => {
      this.productCardBorderRadius = radius;
    });
  };

  setProductCardPhotoHeight = (height: number) => {
    runInAction(() => {
      this.productCardPhotoHeight = height;
    });
  };
}
