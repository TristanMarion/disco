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
    },
    cssVars(): { [key: string]: string } {
      return this.$store.getters.habitatColors(this.index);
    }
  },
  methods: {
    save(e: MouseEvent) {
      (e.target as HTMLElement).blur();
      this.$store.dispatch("saveAnimals", { idx: this.index });
    }
  }
});
</script>

<template>
  <div class="habitat" :style="cssVars">
    <div class="save">
      <img :src="require(`@/assets/images/vehicles/${index}.png`)" alt="" />
      <button @click="save">Save</button>
    </div>

    <div class="pens-container">
      <div class="pens">
        <Pen
          v-for="animal in animals"
          :key="animal"
          :name="animal"
          :colors="cssVars"
          :habitatIndex="index"
        ></Pen>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.habitat {
  display: flex;
  justify-content: center;
  padding: 0 8px;

  .save {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      margin-bottom: 16px;
      animation: fly 3s infinite;
      @keyframes fly {
        50% {
          transform: translateY(-10%);
        }
      }
    }
  }

  button {
    color: white;
    font-size: 1.5rem;
    background-image: linear-gradient(
      to bottom,
      var(--color1),
      var(--color1) 50%,
      var(--color2) 50%
    );
    border: 2px solid var(--color3);
    padding: 8px 16px;
    border-radius: 8px;
    outline: none;

    &:active {
      filter: brightness(80%);
    }
  }

  .pens-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 16px;

    .pens {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
