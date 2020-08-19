import { Animal, MYTHICAL_ANIMALS, RARE_ANIMALS } from "@/models/animals";
import { Habitat, HabitatName } from "@/models/habitat";
import Vue from "vue";
import Vuex from "vuex";
import animalsStats from "./animals-stats";
import habitats from "./habitats";

Vue.use(Vuex);

const numberOfSavedAnimalsProbabilitiesArray = [
  ...Array(10).fill(0),
  ...Array(50).fill(1),
  ...Array(35).fill(2),
  ...Array(5).fill(3),
];

export default new Vuex.Store({
  state: {
    habitats: Array<Habitat>(habitats[0]),
    count: 0,
    savedAnimals: [] as Animal[],
    currentHabitatIndex: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addAnimal(state, { idx, name }: { idx: number; name: Animal }) {
      const count = state.habitats[idx].animals[name] || 0;
      Vue.set(state.habitats[idx].animals, name, count + 1);
    },
    unlockHabitat(state) {
      state.habitats.push(habitats[state.habitats.length]);
    },
    saveSavedAnimals(state, { savedAnimals }: { savedAnimals: Animal[] }) {
      state.savedAnimals = savedAnimals;
    },
  },
  actions: {
    saveAnimals(context, { idx }) {
      const numberOfSavedAnimals =
        numberOfSavedAnimalsProbabilitiesArray[
          Math.floor(
            Math.random() * numberOfSavedAnimalsProbabilitiesArray.length
          )
        ];
      const savedAnimals: Animal[] = [];
      let availableAnimals = Object.keys(habitats[idx].animals) as Animal[];
      for (let i = 0; i < numberOfSavedAnimals; i++) {
        const animalProbabilities = availableAnimals.reduce(
          (prev, animal, index) => {
            let animalProbabilities = 20;
            if (RARE_ANIMALS.includes(animal)) animalProbabilities = 15;
            else if (MYTHICAL_ANIMALS.includes(animal))
              animalProbabilities = 10;
            return [...prev, ...Array(animalProbabilities).fill(index)];
          },
          [] as number[]
        );
        const random =
          animalProbabilities[
            Math.floor(Math.random() * animalProbabilities.length)
          ];
        const savedAnimal = availableAnimals[random];
        availableAnimals = availableAnimals.filter(
          (animal) => animal !== savedAnimal
        );
        savedAnimals.push(savedAnimal);
      }
      savedAnimals.forEach((animal: Animal) => {
        context.commit("addAnimal", { idx, name: animal });
      });
      context.commit("saveSavedAnimals", {
        savedAnimals: savedAnimals.length > 0 ? savedAnimals : [""],
      });
    },
  },
  modules: {},
  getters: {
    counter: (state) => (idx: number, name: Animal) => {
      return Reflect.get(state.habitats[idx].animals, name);
    },
    habitats: (state) => {
      return state.habitats;
    },
    pens: (state) => (index: number) => {
      return Object.entries(state.habitats[index].animals)
        .filter(([, v]) => v! > 0)
        .map(([k]) => k);
    },
    animalGain: (_state, getters) => (idx: number, name: Animal) => {
      const level = Math.min(getters.animalLevel(idx, name), 5);
      return animalsStats.get(name)!.coinsPerMinutePerLevel[level];
    },
    animalDuration: (_state, getters) => (idx: number, name: Animal) => {
      return 60000 / getters.animalGain(idx, name);
    },
    animalCount: (state) => (idx: number, name: Animal) => {
      return Reflect.get(state.habitats[idx].animals, name);
    },
    animalLevel: (state) => (idx: number, name: Animal) => {
      return Math.floor(Reflect.get(state.habitats[idx].animals, name) / 5);
    },
    savedAnimals: (state) => state.savedAnimals,
  },
});
