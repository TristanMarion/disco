import { Habitat } from "@/models/habitat";

const habitats: Habitat[] = [
  {
    name: "Farm",
    animals: new Map([
      ["cochon", 0],
      ["vache", 0],
      ["mouton", 0],
    ]),
  },
  {
    name: "Outback",
    animals: new Map([
      ["kangoo", 0],
      ["koala", 0],
    ]),
  },
];

export default habitats;
