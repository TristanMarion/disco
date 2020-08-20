<template>
  <transition name="fade" @enter="showContent = true">
    <div class="modal-backdrop" :style="cssVars">
      <transition name="grow" @after-leave="close">
        <div class="modal" v-if="showContent">
          <header class="modal-header">
            <slot name="header">
              <template v-if="animal">
                <p class="description">You rescued a</p>
                <p class="animal-name">{{ animal | uppercase }}!</p>
              </template>
              <template v-else>
                Sorry you rescued nothing :(
              </template>
            </slot>
          </header>
          <section class="modal-body" v-if="animal">
            <slot name="body">
              <img
                :src="require(`@/assets/images/animals/${animal}.png`)"
                alt=""
              />
              <div class="animals-before-next-level">
                <template v-if="!maxedOut">
                  <template v-if="animalsToGoBeforeNextLevel !== 5">
                    {{ animalsToGoBeforeNextLevel }}
                    {{ "more to level up" | uppercase }}
                  </template>
                  <template v-else>
                    <div class="level-up">LEVEL UP!</div>
                  </template>
                </template>
                <template v-else>Max level</template>
              </div>
              <div class="progress">
                <span :style="{ color: currentLevelColor }">{{
                  currentLevel
                }}</span>
                <div class="bar">
                  <div>
                    <div
                      class="content"
                      :style="{ background: xpColors[0] }"
                      :class="{
                        growing: !maxedOut && animalsToGoBeforeNextLevel === 4
                      }"
                    ></div>
                  </div>
                  <div>
                    <div
                      class="content"
                      :style="{ background: xpColors[1] }"
                      :class="{
                        growing: !maxedOut && animalsToGoBeforeNextLevel === 3
                      }"
                      v-if="
                        maxedOut ||
                          animalsToGoBeforeNextLevel === 5 ||
                          animalsToGoBeforeNextLevel <= 3
                      "
                    ></div>
                  </div>
                  <div>
                    <div
                      class="content"
                      :style="{ background: xpColors[2] }"
                      :class="{
                        growing: !maxedOut && animalsToGoBeforeNextLevel === 2
                      }"
                      v-if="
                        maxedOut ||
                          animalsToGoBeforeNextLevel === 5 ||
                          animalsToGoBeforeNextLevel <= 2
                      "
                    ></div>
                  </div>
                  <div>
                    <div
                      class="content"
                      :style="{ background: xpColors[3] }"
                      :class="{
                        growing: !maxedOut && animalsToGoBeforeNextLevel === 1
                      }"
                      v-if="
                        maxedOut ||
                          animalsToGoBeforeNextLevel === 5 ||
                          animalsToGoBeforeNextLevel === 1
                      "
                    ></div>
                  </div>
                  <div>
                    <div
                      class="content"
                      :style="{ background: xpColors[4] }"
                      :class="{
                        growing: !maxedOut && animalsToGoBeforeNextLevel === 5
                      }"
                      v-if="maxedOut || animalsToGoBeforeNextLevel === 5"
                    ></div>
                  </div>
                </div>
                <span :style="{ color: nextLevelColor }">
                  {{ nextLevel }}
                </span>
              </div>
            </slot>
          </section>
          <footer class="modal-footer">
            <slot name="footer">
              <button
                type="button"
                class="btn-green"
                @click="showContent = false"
              >
                {{ animal ? "Add to zoo" : "Back to the zoo" | uppercase }}
              </button>
            </slot>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

const levelColors = [
  "#ffa167",
  "#fffe5d",
  "#e1ff64",
  "#65ffff",
  "#ffc5ff",
  "#ffb2ff"
];

const xpColors = [
  ["#ff3505", "#ff4f06", "#ff6e00", "#ff8a00", "#fca800"],
  ["#fcc300", "#e4cf00", "#cad900", "#b7e600", "#8dfb00"],
  ["#80fa00", "#5dff24", "#48ff59", "#23ff8f", "#08ffc0"],
  ["#00ffea", "#21e3ef", "#57c0ef", "#839ef5", "#a283fb"],
  ["#c666ff", "#d465ef", "#df60eb", "#ff53db", "#ff54d2"]
];

export default Vue.extend({
  name: "modal",
  props: {
    animal: {
      required: false,
      type: String
    }
  },
  data: function() {
    return { showContent: false };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {
    ...mapGetters(["currentHabitatIndex"]),
    count(): number {
      return this.$store.getters.animalCount(
        this.currentHabitatIndex,
        this.animal
      );
    },
    currentLevel(): number {
      return Math.min(Math.floor((this.count - 1) / 5) + 1, 5);
    },
    currentLevelColor(): string {
      return levelColors[this.currentLevel - 1];
    },
    nextLevel(): number | string {
      return this.count < 21 ? this.currentLevel + 1 : "Max";
    },
    nextLevelColor(): string {
      return this.nextLevel !== "Max"
        ? levelColors[(this.nextLevel as number) - 1]
        : levelColors[5];
    },
    xpPoint(): number {
      return this.count;
    },
    xpColors(): string[] {
      return xpColors[Math.min(this.currentLevel - 1, 5)];
    },
    maxedOut(): boolean {
      return this.count > 25;
    },
    animalsToGoBeforeNextLevel(): number {
      return 5 - (this.count % 5);
    },
    cssVars(): string[] {
      return this.$store.getters.habitatColors(this.currentHabitatIndex);
    }
  }
});
</script>

<style lang="scss" scoped>
.grow-enter-active,
.grow-leave-active {
  transition: all 0.5s;
}
.grow-enter,
.grow-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 200px;
  border: 2px solid var(--color6);
  outline: 2px solid var(--color7);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;

  background: repeating-linear-gradient(
      to bottom left,
      var(--color7) 0,
      var(--color7) 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      to bottom right,
      var(--color6) 0,
      var(--color6) 1px,
      var(--color7) 1px,
      var(--color7) 2px
    );

  &-header,
  &-footer {
    padding: 15px;

    p {
      margin: 0;
    }
  }

  &-header {
    justify-content: space-between;

    p {
      font-size: 1.2rem;

      &.animal-name {
        font-size: 2rem;
      }
    }
  }

  &-body {
    position: relative;
    padding: 20px 10px;

    img {
      margin-top: -64px;
      animation: 0.5s bounce infinite;
      transform-origin: center 75%;

      @keyframes bounce {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(0.925, 1.075) translateY(-4px);
        }
        100% {
          transform: scale(1);
        }
      }
    }

    .level-up {
      animation: level-up-grow 0.5s 0.5s ease-in-out infinite;
      @keyframes level-up-grow {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
    }

    .progress {
      display: flex;
      align-items: center;

      > span {
        width: 20px;
        text-align: center;
      }

      .bar {
        margin: 0 8px;
        display: flex;
        height: 8px;
        border-radius: 3px;
        width: 100%;
        border: 1px solid white;
        overflow: hidden;

        > div {
          width: 20%;
          height: 100%;

          &:not(:last-child) {
            border-right: 1px solid white;
          }

          div.content {
            width: 100%;
            height: 100%;

            &.growing {
              animation: grow 1s cubic-bezier(0.42, 0, 0.58, 1);
              transform-origin: left;

              @keyframes grow {
                from {
                  transform: scaleX(0);
                }
                to {
                  transform: scaleX(1);
                }
              }
            }
          }
        }
      }
    }
  }

  &-footer {
    justify-content: flex-end;
  }

  .btn-green {
    color: white;
    background-image: linear-gradient(
      to bottom,
      #7cd71a,
      #7cd71a 50%,
      #68cf0e 50%
    );
    border: 2px solid #285119;
    border-radius: 5px;
    font-size: 1.5rem;
    padding: 10px 20px;
    outline: none;

    &:active {
      background-image: linear-gradient(
        to bottom,
        darken(#7cd71a, 10%),
        darken(#7cd71a, 10%),
        darken(#68cf0e, 10%) 50%
      );
    }
  }
}
</style>
