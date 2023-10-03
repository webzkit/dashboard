<template>
  <div
    class="sub-sidebar-container"
    :class="{
      'is-collapse': isPcDisplay(getDisplayMode) && getSubMenuCollaspe,
    }"
    @scroll="onSidebarScroll"
  >
    <Logo
      :show-logo="isMenuModeSingle(getMenuMode)"
      :class="{
        'sidebar-logo': true,
        'sidebar-logo-bg': isMenuModeSingle(getMenuMode),
        shadow: sidebarScrollTop,
      }"
    />

    <el-menu
      :unique-opened="getSubMenuUniqueOpened"
      :default-openeds="getDefaultOpenedPaths"
      :default-active="getActiveRoute($route)"
      :collapse="isPcDisplay(getDisplayMode) && getSubMenuCollaspe"
      :collapse-transition="false"
      :class="{
        'is-collapse-without-logo':
          !isMenuModeSingle(getMenuMode) && getSubMenuCollaspe,
      }"
    >
      <transition-group name="sub-sidebar">
        <template v-for="(route, index) in getSidebarMenus">
          <ItemSidebar
            v-if="get(route, 'meta.sidebar') !== false"
            :key="get(route, 'path') || index"
            :item="route"
            :base-path="get(route, 'path')"
          />
        </template>
      </transition-group>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "../Logo/index.vue";
import { DisplayModeEnum, MenuModeEnum } from "/@/enums/appEnum";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import ItemSidebar from "./ItemSidebar.vue";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { get } from "lodash";

const { getDisplayMode } = useAppSetting();
const {
  getSubMenuCollaspe,
  getMenuMode,
  getSubMenuUniqueOpened,
  getSidebarMenus,
  getDefaultOpenedPaths,
} = useMenuSetting();

const sidebarScrollTop = ref(0);
const onSidebarScroll = function (event: any) {
  sidebarScrollTop.value = event.target.scrollTop;
};

const isPcDisplay = (value: string) => value === DisplayModeEnum.PC;
const isMenuModeSingle = (value: string) => value === MenuModeEnum.SINGLE;

const getActiveRoute = (route: any): any => {
  return route.meta.activemenu || route.path;
};
</script>

<style lang="scss" scoped>
.sub-sidebar-container {
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  // firefox
  scrollbar-width: none;

  // chrome
  &::-webkit-scrollbar {
    display: none;
  }

  width: var(--g-sub-sidebar-width);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: var(--g-sub-sidebar-bg);
  box-shadow: 10px 0 10px -10px var(--g-box-shadow-color);
  transition:
    background-color 0.3s,
    var(--el-transition-box-shadow),
    left 0.3s,
    width 0.3s;

  &.is-collapse {
    width: 64px;

    .sidebar-logo {
      &:not(.sidebar-logo-bg) {
        display: none;
      }

      :deep(span) {
        display: none;
      }
    }
  }

  .sidebar-logo {
    transition:
      box-shadow 0.2s,
      background-color 0.3s,
      color 0.3s;
    background-color: var(--g-sub-sidebar-bg);

    &:not(.sidebar-logo-bg) {
      :deep(span) {
        color: var(--g-sub-sidebar-menu-color);
      }
    }

    &.sidebar-logo-bg {
      background-color: var(--g-main-sidebar-bg);
    }

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .el-menu {
    border-right: 0;
    padding-top: var(--g-sidebar-logo-height);
    transition:
      border-color 0.3s,
      background-color 0.3s,
      color 0.3s,
      padding-top 0.3s;
    background-color: var(--g-sub-sidebar-bg);

    &:not(.el-menu--collapse) {
      width: inherit;
    }

    &.is-collapse-without-logo {
      padding-top: 0;
    }

    &.el-menu--collapse {
      :deep(.title-icon) {
        margin-right: 0;
      }

      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        span,
        .el-sub-menu__icon-arrow {
          display: none;
        }
      }
    }

    &.menu-radius:not(.el-menu--collapse) {
      .sidebar-item {
        padding: 0 10px;

        &:first-child {
          padding-top: 10px;
        }

        &:last-child {
          padding-bottom: 10px;
        }
      }

      :deep(.el-menu--inline),
      :deep(.el-menu-item),
      :deep(.el-sub-menu__title) {
        border-radius: 10px;
      }
    }
  }
}

.sub-sidebar-enter-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.sub-sidebar-enter-from,
.sub-sidebar-leave-active {
  opacity: 0;
  transform: translateY(30px) skewY(10deg);
}

.sub-sidebar-leave-active {
  position: absolute;
}
</style>
