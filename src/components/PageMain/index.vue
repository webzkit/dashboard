<template>
  <div class="page-main" id="page-main">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.page-main {
  position: absolute;
  margin: 15px;
  padding: 15px 15px;
  background-color: var(--g-app-bg);
  transition: background-color 0.3s;
  width: calc(100% - 30px);
  height: calc(100% - var(--g-topbar-height) - 15px);

  &.is-collaspe {
    overflow: hidden;

    .collaspe {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 40px 0 10px;
      text-align: center;
      font-size: 24px;
      color: var(--el-text-color-primary);
      text-shadow: 0 0 1px var(--el-text-color-primary);
      background: linear-gradient(to bottom, transparent, var(--g-app-bg));
      transition:
        background 0.3s,
        var(--el-transition-color);
      cursor: pointer;

      &:hover {
        color: var(--el-text-color-secondary);
      }
    }
  }

  .title-container {
    width: calc(100% + 40px);
    padding: 14px 20px;
    margin-left: -20px;
    margin-top: -20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: var(--el-transition-border);
  }
}
</style>
