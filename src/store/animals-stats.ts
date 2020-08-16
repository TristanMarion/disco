import { Animal } from "@/models/animals";

interface AnimalStat {
  duration: number;
}

const animalsStats = new Map<Animal, AnimalStat>([
  ["cochon", { duration: 1000 }],
  ["mouton", { duration: 2500 }],
  ["vache", { duration: 3000 }],
]);

export default animalsStats;
