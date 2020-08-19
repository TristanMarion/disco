<template>
  <div>
    <ul>
      <li is="Pen" v-for="animal in animals" :key="animal" :name="animal"></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PenVue from "./Pen.vue";
import { Animal } from "@/models/animals";
import habitats from "@/store/habitats";

export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true,
      validator: function(value) {
        return value < habitats.length;
      }
    }
  },
  components: {
    Pen: PenVue
  },
  computed: {
    animals(): Animal[] {
      return this.$store.getters.pens(this.index);
    }
  }
});
</script>
