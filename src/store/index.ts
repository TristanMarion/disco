import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Habitat } from "@/models/habitat";
import { Animal } from "@/models/animals";
import habitats from "./habitats";
import animalsStats from "./animals-stats";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    habitats: Array<Habitat>(habitats[0]),
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    addAnimal(state, { idx, name }: { idx: number; name: Animal }) {
      const count = state.habitats[idx].animals.get(name) || 0;
      Vue.set(state.habitats[idx].animals, name, count + 1);
    },
    unlockHabitat(state) {
      state.habitats.push(habitats[state.habitats.length]);
      console.log(state.habitats);
    },
  },
  actions: {},
  modules: {},
  getters: {
    counter: (state) => (
      idx: number,
      name: "cochon" | "mouton" | "kangoo" | "koala"
    ) => {
      console.log(idx, name);
      return state.habitats[idx].animals.get(name) || 0;
    },
    habitats: (state) => state.habitats,
    animals: (state) => (index: number) => {
      console.log(index, state.habitats);
      return state.habitats[index].animals
        ? state.habitats[index].animals.keys()
        : new Map();
    },
    animalDuration: (state) => (name: Animal) => {
      return animalsStats.get(name)?.duration;
    },
  },
});
