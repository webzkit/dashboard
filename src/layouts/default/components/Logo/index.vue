<template>
  <router-link :to="linkRoot" class="title" :class="{ 'is-link': true }" :title="title">
    <img v-if="showLogo" :src="logo" class="logo">
    <span v-if="showTitle">{{ title }}</span>
  </router-link>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import imgLogo from "/@/layouts/default/assets/images/logo.png";

export default defineComponent({
  props: {
    showLogo: {
      type: Boolean,
      default: true
    },

    showTitle: {
      type: Boolean,
      default: true
    }
  },

  setup() {
    const title = ref(import.meta.env.VITE_GLOB_APP_TITLE);
    const logo = ref(imgLogo);
    const linkRoot = computed(() => {
      return {
        name: 'Dashboard'
      }
    })

    return {
      title,
      logo,
      linkRoot
    }
  }
});
</script>

<style lang="scss" scoped>
.title {
  position: fixed;
  z-index: 1000;
  top: 0;
  width: inherit;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--g-sidebar-logo-height);
  text-align: center;
  overflow: hidden;
  text-decoration: none;

  &.is-link {
    cursor: pointer;
  }

  .logo {
    width: 30px;
    height: 30px;

    &+span {
      margin-left: 10px;
    }
  }

  span {
    display: block;
    font-weight: bold;
    color: #fff;
    @include text-overflow;
  }
}
</style>
