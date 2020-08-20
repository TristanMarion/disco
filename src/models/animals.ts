type FarmAnimal = "sheep" | "pig" | "rabbit" | "horse" | "cow" | "unicorn";
type OutbackAnimal =
  | "kangaroo"
  | "platypus"
  | "crocodile"
  | "koala"
  | "cockatoo"
  | "tiddalik";

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
const OUTBACK_ANIMALS: OutbackAnimal[] = [
  "kangaroo",
  "platypus",
  "crocodile",
  "koala",
  "cockatoo",
  "tiddalik",
];

export const ANIMALS: Animal[] = [...FARM_ANIMALS, ...OUTBACK_ANIMALS];

// Animals per rarity

export const COMMON_ANIMALS: Animal[] = [
  "sheep",
  "pig",
  "rabbit",
  "kangaroo",
  "platypus",
  "crocodile",
];

export const RARE_ANIMALS: Animal[] = ["horse", "cow", "koala", "cockatoo"];

export const MYTHICAL_ANIMALS: Animal[] = ["unicorn", "tiddalik"];
