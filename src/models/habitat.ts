import { Animal } from "./animals";

export interface Habitat {
  name: string;
  animals: Map<Animal, number>;
}
