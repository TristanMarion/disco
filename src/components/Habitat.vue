<template>
  <div>
    {{ index }}
    {{ animals }}
    <ul>
      <li is="pen" v-for="animal in animals" :key="animal" :name="animal"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Animal } from "@/models/animals";
import PenVue from "./Pen.vue";
export default Vue.extend({
  props: {
    index: Number
  },
  components: {
    pen: PenVue
  },
  computed: {
    animals(): Animal[] {
      return this.$store.getters.animals(this.index);
    }
  }
});
</script>
