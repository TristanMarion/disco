<template>
  <div>
    {{ name }} {{ duration }}
    <div class="bar-container">
      <div class="bar">
        <transition name="grow">
          <div class="progress" v-if="show" :style="cssVars"></div>
        </transition>
        <transition name="scale" @after-enter="afterEnterScale">
          <div class="progress-scale" v-if="showScale"></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    name: String
  },
  data: function(): {
    show: boolean;
    showScale: boolean;
    interval: number | undefined;
  } {
    return {
      show: false,
      showScale: false,
      interval: undefined
    };
  },
  mounted() {
    this.show = true;
    this.interval = setInterval(() => {
      this.increment();
      this.show = false;
      this.showScale = true;
      setTimeout(() => (this.show = true), 0);
    }, this.duration);
  },
  methods: {
    increment() {
      this.$store.commit("increment", { idx: 0, name: "cochon" });
    },
    increment2() {
      this.$store.commit("increment", { idx: 0, name: "mouton" });
    },
    afterEnterScale() {
      this.showScale = false;
    }
  },
  computed: {
    duration() {
      return this.$store.getters.animalDuration(this.name);
    },
    cssVars() {
      return {
        "--duration": this.duration / 1000 + "s"
      };
    }
  }
});
</script>

<style lang="scss" scoped>
div.bar {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid #003137;
  width: 100px;
  height: 10px;
  border-radius: 10px;
  background: #003137;
  position: relative;

  .progress {
    height: 100%;
    background-image: linear-gradient(
      to top,
      #e8cc00,
      #e8cc00 70%,
      #e2db60 70%
    );
    border-radius: 10px;
  }

  .progress-scale {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-image: linear-gradient(
      to top,
      #e8cc00,
      #e8cc00 70%,
      #e2db60 70%
    );
    border-radius: 10px;
    opacity: 0;
  }
}

.grow-enter-active {
  animation: var(--duration) grow linear;
}

.scale-enter-active {
  animation: 0.5s scaleAnimation linear;
}

@keyframes grow {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

@keyframes scaleAnimation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  25% {
    transform: scale(1.025, 1.25);
    opacity: 1;
  }
  to {
    transform: scale(1.1, 2);
    opacity: 0;
  }
}
</style>
