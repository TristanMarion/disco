<script lang="ts">
import Vue from "vue";
import { ANIMALS, Animal } from "@/models/animals";

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
      validator: function(value: string) {
        return ANIMALS.includes(value as Animal);
      }
    },
    colors: {
      type: Object,
      required: true
    },
    habitatIndex: {
      type: Number,
      required: true
    }
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
      this.$store.commit("increment", {
        idx: this.habitatIndex,
        name: this.name
      });
    },
    afterEnterScale() {
      this.showScale = false;
    }
  },
  computed: {
    duration(): number {
      return this.$store.getters.animalDuration(this.habitatIndex, this.name);
    },
    count(): number {
      return Math.min(
        this.$store.getters.animalCount(this.habitatIndex, this.name),
        25
      );
    },
    level(): number | string {
      const level = this.$store.getters.animalLevel(
        this.habitatIndex,
        this.name
      );
      return level < 5 ? level + 1 : "Max";
    },
    gain(): number {
      return this.$store.getters.animalGain(this.habitatIndex, this.name);
    },
    cssVars(): { "--duration": string } {
      return {
        "--duration": this.duration / 1000 + "s"
      };
    }
  },
  watch: {
    duration: function() {
      clearInterval(this.interval);
      this.show = false;
      setTimeout(() => (this.show = true), 0);
      this.interval = setInterval(() => {
        this.increment();
        this.show = false;
        this.showScale = true;
        setTimeout(() => (this.show = true), 0);
      }, this.duration);
    }
  }
});
</script>

<template>
  <div class="pen" :style="colors">
    <div class="first-column">
      <img :src="require(`@/assets/images/animals/${name}.png`)" alt="" />
      <div class="level">Level {{ level }}</div>
      <transition name="fade" mode="out-in">
        <div :key="count" class="count">x{{ count }}</div>
      </transition>
    </div>
    <div class="second-column">
      <div class="name">{{ name | uppercase }}</div>
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
      <div class="gain">
        <p>
          {{ gain }}
        </p>
        <p class="text">{{ "coins / min" | uppercase }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pen {
  color: white;
  display: flex;
  padding: 16px;
  background: var(--color1);
  margin: 8px;
  border: 2px solid var(--color4);
  position: relative;
  border-radius: 6px;

  &:after {
    background: none;
    border: 2px solid var(--color3);
    border-radius: 8px;
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    pointer-events: none;
  }

  .first-column {
    position: relative;
    background-image: linear-gradient(
      to bottom,
      var(--color4),
      var(--color4) 50%,
      var(--color3) 50%
    );
    padding: 0px 8px 4px 8px;
    border: 1px solid var(--color5);
    margin-right: 8px;
    border-radius: 8px;

    &:after {
      background: none;
      border: 1px solid var(--color8);
      border-radius: 8px;
      content: "";
      display: block;
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      pointer-events: none;
    }

    img {
      height: 64px;
      margin-top: -8px;
    }

    .count {
      position: absolute;
      top: 4px;
      right: 4px;
    }

    .level {
      text-align: center;
    }
  }

  .second-column {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 1.5rem;
    }

    p {
      margin: 0;
    }

    .gain {
      background: #00000044;
      width: 100%;
      text-align: center;
      font-size: 1.25rem;
      flex: 1;
      padding: 2px;
      margin: 4px 0;
      border: 1px solid #00000088;
      border-radius: 8px;
      color: #ffdd08;
      box-sizing: border-box;

      .text {
        line-height: 0.5rem;
        color: #eddc8c;
        font-size: 0.9rem;
      }
    }
  }
}

div.bar {
  border: 1px solid #00000088;
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

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
