import { Animal } from "./animals";

export interface Habitat {
  name: HabitatName;
  price: number;
  priceIncrement: number;
  maxPrice: number;
  animals: { [key in Animal]?: number };
}

export type HabitatName = "farm";
