<template>
  <footer class="copyright">
    <span>Copyright</span>
    <span class="icon">©</span>
    <span>{{ unref(getDateFooter) }}</span>
    <a :href="unref(getWebsiteFooter)" target="_blank" rel="noopener">{{
      unref(getCompanyFooter)
    }}</a>
  </footer>
</template>

<script lang="ts" setup>
import { unref } from "vue";
import { useFooterSetting } from "/@/hooks/setting/useFooterSetting";

const { getDateFooter, getCompanyFooter, getWebsiteFooter } =
  useFooterSetting();
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  span,
  a {
    padding: 0 5px;
  }

  a {
    text-decoration: none;
    color: var(--el-text-color-secondary);
    transition: var(--el-transition-color);

    &:hover {
      color: var(--el-text-color-primary);
    }
  }

  .icon {
    padding: 0;
    font-size: 18px;
  }
}
</style>
