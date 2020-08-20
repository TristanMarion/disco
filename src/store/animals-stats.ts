import { Animal } from "@/models/animals";

interface AnimalStat {
  coinsPerMinutePerLevel: number[];
}

const animalsStats = new Map<Animal, AnimalStat>([
  // Farm
  ["sheep", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["pig", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["rabbit", { coinsPerMinutePerLevel: [3, 3.4, 3.8, 4.2, 4.6, 6] }],
  ["horse", { coinsPerMinutePerLevel: [5, 5.7, 6.4, 7.1, 7.8, 10] }],
  ["cow", { coinsPerMinutePerLevel: [5, 5.7, 6.4, 7.1, 7.8, 10] }],
  ["unicorn", { coinsPerMinutePerLevel: [7, 7.9, 8.8, 9.7, 10.6, 14] }],

  // Outback
  ["kangaroo", { coinsPerMinutePerLevel: [4, 4.5, 5, 5.5, 6, 6.5, 8] }],
  ["platypus", { coinsPerMinutePerLevel: [4, 4.5, 5, 5.5, 6, 6.5, 8] }],
  ["crocodile", { coinsPerMinutePerLevel: [4, 4.5, 5, 5.5, 6, 6.5, 8] }],
  ["koala", { coinsPerMinutePerLevel: [6, 6.8, 7.6, 8.4, 9.2, 12] }],
  ["cockatoo", { coinsPerMinutePerLevel: [6, 6.8, 7.6, 8.4, 9.2, 12] }],
  ["tiddalik", { coinsPerMinutePerLevel: [8, 9, 10, 11, 12, 16] }],
]);

export default animalsStats;
