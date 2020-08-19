type FarmAnimal = "sheep" | "pig" | "rabbit" | "horse" | "cow" | "unicorn";
type OutbackAnimal = "kangoo" | "koala" | "crocodile";

export type Animal = FarmAnimal | OutbackAnimal;

// Animals per habitat

const FARM_ANIMALS: FarmAnimal[] = [
  "sheep",
  "pig",
  "rabbit",
  "horse",
  "cow",
  "unicorn",
];
const OUTBACK_ANIMALS: OutbackAnimal[] = ["kangoo", "koala", "crocodile"];

export const ANIMALS: Animal[] = [...FARM_ANIMALS, ...OUTBACK_ANIMALS];

// Animals per rarity

export const COMMON_ANIMALS: Animal[] = ["sheep", "pig", "rabbit"];

export const RARE_ANIMALS: Animal[] = ["horse", "cow"];

export const MYTHICAL_ANIMALS: Animal[] = ["unicorn"];
