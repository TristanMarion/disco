<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <template v-if="animal">
            <p>You rescued a</p>
            <p class="animal-name">{{ animal | uppercase }}!</p>
          </template>
          <template v-else>
            Sorry you rescued nothing :(
          </template>
        </slot>
      </header>
      <section class="modal-body" v-if="animal">
        <slot name="body">
          <img :src="require(`@/assets/images/animals/${animal}.png`)" alt="" />
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button type="button" class="btn-green" @click="close">
            {{ animal ? "Add to zoo" : "Back to the zoo" | uppercase }}
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "modal",
  props: {
    animal: {
      required: false,
      type: String
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
});
</script>

<style lang="scss" scoped>
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
  // box-shadow: 2px 2px 20px 1px;
  border: 2px solid #46711f;
  outline: 2px solid #3a6513;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  background: repeating-linear-gradient(
      to bottom left,
      #3a6513 0,
      #3a6513 1px,
      transparent 1px,
      transparent 2px
    ),
    repeating-linear-gradient(
      to bottom right,
      #46711f 0,
      #46711f 1px,
      #3a6513 1px,
      #3a6513 2px
    );

  &-header,
  &-footer {
    padding: 15px;

    p {
      margin: 0;
    }
  }

  &-header {
    color: white;
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
  }
}
</style>
