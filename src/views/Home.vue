<template>
  <div>
    {{ counter }}

    <Habitat
      v-for="(habitat, index) in habitats"
      :key="habitat.name"
      :index="index"
    ></Habitat>

    <modal
      v-show="isModalVisible"
      @close="closeModal"
      :animal="savedAnimals[0]"
      :showProp="isModalVisible"
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
      setTimeout(() => {
        this.$store.commit("saveSavedAnimals", {
          savedAnimals:
            this.savedAnimals.length > 1 ? this.savedAnimals.slice(1) : []
        });
      }, 0);
    }
  },
  watch: {
    savedAnimals: function(newValue) {
      if (newValue.length > 0) this.showModal();
    }
  }
});
</script>
