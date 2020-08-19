<template>
  <div>
    {{ counter }}

    <ul>
      <li
        is="Habitat"
        v-for="(habitat, index) in habitats"
        :key="habitat.name"
        :index="index"
      ></li>
    </ul>

    <button @click="save">Save</button>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
      :animal="savedAnimals[0]"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HabitatVue from "@/components/Habitat.vue";
import ModalVue from "@/components/Modal.vue";
import { Animal } from "@/models/animals";

export default Vue.extend({
  components: {
    Habitat: HabitatVue,
    modal: ModalVue
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  computed: {
    habitats() {
      return this.$store.getters.habitats;
    },
    counter() {
      return this.$store.state.count;
    },
    savedAnimals(): Animal[] {
      return this.$store.getters.savedAnimals;
    }
  },
  methods: {
    unlock() {
      this.$store.commit("unlockHabitat");
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.$store.commit("saveSavedAnimals", {
        savedAnimals:
          this.savedAnimals.length > 1 ? this.savedAnimals.slice(1) : []
      });
    },
    save() {
      this.$store.dispatch("saveAnimals", { idx: 0 });
    }
  },
  watch: {
    savedAnimals: function(newValue, oldValue) {
      if (newValue.length > 0) this.showModal();
    }
  }
});
</script>
