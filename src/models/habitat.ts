import { Animal } from "./animals";

export interface Habitat {
  name: HabitatName;
  price: number;
  priceIncrement: number;
  maxPrice: number;
  animals: { [key in Animal]?: number };
  colors: string[];
}

export type HabitatName = "farm" | "outback";
