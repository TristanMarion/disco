import { Animal } from "@/models/animals";

interface AnimalStat {
  coinsPerMinutePerLevel: number[];
}

const animalsStats = new Map<Animal, AnimalStat>([
  ["sheep", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["pig", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["rabbit", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["horse", { coinsPerMinutePerLevel: [5, 5.7, 6.4, 7.1, 7.8, 10] }],
  ["cow", { coinsPerMinutePerLevel: [5, 5.7, 6.4, 7.1, 7.8, 10] }],
  ["unicorn", { coinsPerMinutePerLevel: [7, 7.9, 8.8, 9.7, 10.6, 14] }],
]);

export default animalsStats;
