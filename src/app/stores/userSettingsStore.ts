import { makeAutoObservable, runInAction } from "mobx";

export default class UserSettingsStore {
  productCardBackgroundColor: string = "white";
  productCardTitleColor: string = "gray";
  productCardDescriptionColor: string = "green";

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
          // Bilinmeyen colorType durumu
          console.error("Geçersiz colorType");
          break;
      }
    });
  };
}
