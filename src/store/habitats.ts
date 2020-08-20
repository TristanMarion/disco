import { Habitat } from "@/models/habitat";

const habitats: Habitat[] = [
  {
    name: "farm",
    price: 100,
    priceIncrement: 10,
    maxPrice: 2000,
    animals: {
      sheep: 0,
      pig: 0,
      rabbit: 0,
      horse: 0,
      cow: 0,
      unicorn: 0,
    },
    colors: [
      "#75c120",
      "#68ab1c",
      "#49970f",
      "#6eaf37",
      "#5bc01a",
      "#46711f",
      "#3a6513",
      "#1f3d19",
    ],
  },
  {
    name: "outback",
    price: 100,
    priceIncrement: 10,
    maxPrice: 2000,
    animals: {
      kangaroo: 0,
      platypus: 0,
      crocodile: 0,
      koala: 0,
      cockatoo: 0,
      tiddalik: 0,
    },
    colors: [
      "#e1ab6d",
      "#dd9f58",
      "#a86a43",
      "#c69a6d",
      "#d0a875",
      "#725243",
      "#634334",
      "#725243",
    ],
  },
];

export default habitats;
