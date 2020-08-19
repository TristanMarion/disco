import { Habitat } from "@/models/habitat";

const habitats: Habitat[] = [
  {
    name: "farm",
    price: 100,
    priceIncrement: 10,
    maxPrice: 2000,
    animals: {
      sheep: 0,
      pig: 1,
      rabbit: 0,
      horse: 0,
      cow: 0,
      unicorn: 0,
    },
  },
];

export default habitats;
