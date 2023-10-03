<template>
  <transition name="main-sidebar">
    <div v-if="isShow" class="main-sidebar-container">
      <Logo :show-logo="getShowLogo" :show-title="false" class="sidebar-logo" />

      <div class="nav">
        <template v-if="items.length > 0" v-for="(item, index) in items">
          <div
            v-if="item.children && item.children.length !== 0"
            :key="index"
            class="item"
            :title="item.title"
            :class="{
              item: true,
              active: isActive(index),
            }"
            @click="switchMenu(index)"
          >
            <Icon :icon="item.icon" />
            <span v-html="item.title" />
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, inject, unref, watch } from "vue";
import Logo from "../Logo/index.vue";
import { useI18n } from "/@/hooks/web/useI18n";
import Icon from "/@/components/Icon";
import { get, map } from "lodash";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { DisplayModeEnum, MenuModeEnum } from "/@/enums/appEnum";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";

const { t } = useI18n();
const { getMenuMode, getMenus, getActiveMenu, getShowLogo } = useMenuSetting();
const { getDisplayMode } = useAppSetting();

const items = map(unref(getMenus), (item) => {
  return {
    title: t(get(item, "meta.title", "")),
    icon: get(item, "meta.icon", "ep:home-filled"),
    children: get(item, "children", []),
  };
});

const switchMenu = inject("switchMenu") as any;

const isShow = computed(() => {
  return (
    unref(getMenuMode) === MenuModeEnum.SIDE ||
    (unref(getDisplayMode) === DisplayModeEnum.MOBILE &&
      unref(getMenuMode) !== MenuModeEnum.SINGLE)
  );
});

const isActive = function (index: number): boolean {
  return index === unref(getActiveMenu);
};

watch(
  () => unref(getShowLogo),

  (val) => {
    let height = "50px";

    if (!val) {
      height = "0px";
    }

    document.documentElement.style.setProperty(
      "--g-sidebar-logo-height",
      height,
    );
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.main-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;

  // firefox
  scrollbar-width: none;

  // chrome
  &::-webkit-scrollbar {
    display: none;
  }

  position: relative;
  z-index: 1;
  width: var(--g-main-sidebar-width);
  color: var(--g-main-sidebar-menu-color);
  background-color: var(--g-main-sidebar-bg);
  transition:
    background-color 0.3s,
    var(--el-transition-color);

  .sidebar-logo {
    transition: 0.3s;
    background-color: var(--g-main-sidebar-bg);
  }

  .nav {
    width: inherit;
    padding-top: var(--g-sidebar-logo-height);

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      height: 60px;
      padding: 0 5px;
      cursor: pointer;
      color: var(--g-main-sidebar-menu-color);
      background-color: var(--g-main-sidebar-bg);
      transition:
        background-color 0.3s,
        var(--el-transition-color);

      &:hover {
        color: var(--g-main-sidebar-menu-hover-color);
        background-color: var(--g-main-sidebar-menu-hover-bg);
      }

      &.active {
        color: var(--g-main-sidebar-menu-active-color);
        background-color: var(--g-main-sidebar-menu-active-bg);
      }

      .el-icon {
        margin: 0 auto;
        font-size: 24px;
      }

      span {
        text-align: center;
        font-size: 14px;
        @include text-overflow(1, false);
      }
    }
  }
}

.main-sidebar-enter-active,
.main-sidebar-leave-active {
  transition: transform 0.3s;
}

.main-sidebar-enter-from,
.main-sidebar-leave-to {
  transform: translateX(calc(var(--g-main-sidebar-width) * -1));
}
</style>
