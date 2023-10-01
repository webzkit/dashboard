<template>
  <div class="layout">
    <div id="app-main">
      <Header />

      <div class="wrapper">
        <div class="sidebar-container" :class="{ 'show': isDisplayModeMobile(getDisplayMode) && !getSubMenuCollaspe }">
          <MainSidebar />
          <SubSidebar />
        </div>

        <div @click="toogleSidebarCollapse"
          :class="[{ 'show': isDisplayModeMobile(getDisplayMode) && !getSubMenuCollaspe }, 'sidebar-mask']" />

        <div class="main-container">
          <Topbar v-if="isShowTopbar" />

          <div class="main">
            <span v-if="getEnableMultiTab">
              <Tabs />
            </span>
            <router-view v-slot="{ Component, route }">
              <transition name="main" mode="out-in" appear>
                <keep-alive v-if="keepAliveStore.getNameComponents.length > 0"
                  :include="keepAliveStore.getNameComponents">
                  <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <component v-else :is="Component" :key="route.fullPath"></component>
              </transition>
            </router-view>
          </div>

          <Footer v-if="getEnableCopyright" />
        </div>
      </div>
      <el-backtop :right="20" :bottom="20" title="Top"></el-backtop>
    </div>
    <AppSetting />
  </div>
</template>

<script setup lang="ts">
import AppSetting from "./components/AppSetting/index.vue";
import Header from "./components/Header/index.vue";
import Topbar from "./components/Topbar/index.vue";
import Tabs from "./components/Tabs/index.vue";
import MainSidebar from "./components/MainSidebar/index.vue";
import SubSidebar from "./components/SubSidebar/index.vue";
import Footer from "./components/Foolter/index.vue";
import { computed, getCurrentInstance, onMounted, provide, unref } from "vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { isExternalLink } from "/@/utils";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { DisplayModeEnum, MenuModeEnum } from "/@/enums/appEnum";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useFooterSetting } from "/@/hooks/setting/useFooterSetting";
import { useKeepAliveStore } from "/@/store/modules/keepAlive";
import { useRouter } from "vue-router";
import { useTabs } from "/@/hooks/web/useTabs";


const { refreshTab } = useTabs();
const keepAliveStore = useKeepAliveStore();
const { getDisplayMode } = useAppSetting();
const {
  getEnableBreadcrumb,
  getEnableSidebarCollapse,
  getEnablePageReload,
  getEnableMultiTab,
} = useHeaderSetting();

const {
  getSubMenuCollaspe,
  setMenuSetting,
  getMenuMode
} = useMenuSetting();

const menuSetting = useMenuSetting();
const { getEnableCopyright } = useFooterSetting();

const router = useRouter();

const { proxy } = getCurrentInstance() as any;
onMounted(() => {
  proxy.$hotkeys('f5', (event: any) => {
    if (unref(getEnablePageReload)) {
      event.preventDefault();
      refreshTab();
    }
  })
});

provide('switchMenu', switchMenu)
function switchMenu(index: number) {
  menuSetting.menuStore.setActived(index);
  if (menuSetting.getSwitchMainMenuAndPageJump) {
    if (isExternalLink(menuSetting.menuStore.sidebarMenuFirstDeepestPath)) {
      window.open(menuSetting.menuStore.sidebarMenuFirstDeepestPath, '_blank');
    } else {
      router.push(menuSetting.menuStore.sidebarMenuFirstDeepestPath);
    }
  }
}

const isDisplayModeMobile = (value: string) => value === DisplayModeEnum.MOBILE;

const toogleSidebarCollapse = function () {
  setMenuSetting({ subMenuCollapse: !unref(getSubMenuCollaspe) });
}

const isShowTopbar = computed(() => {
  return !(unref(getMenuMode) === MenuModeEnum.HEAD && !unref(getEnableSidebarCollapse) && !unref(getEnableBreadcrumb))
});
</script>


<style lang="scss" scoped>
[data-mode="mobile"] {
  .sidebar-container {
    transform: translateX(calc((var(--g-main-sidebar-width) + var(--g-sub-sidebar-width)) * -1));

    &.show {
      transform: translateX(0);
    }
  }

  .main-container {
    margin-left: 0 !important;
  }

  &[data-menu-mode="single"] {
    .sidebar-container {
      transform: translateX(calc(var(--g-sub-sidebar-width) * -1));

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.layout {
  height: 100%;
}

#app-main {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: all 0.2s;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: -1px 0 0 0 var(--g-box-shadow-color);
  transition: padding-top 0.3s;

  .sidebar-container {
    position: fixed;
    z-index: 1010;
    top: 0;
    bottom: 0;
    display: flex;
    transition: transform 0.3s, top 0.3s;
    width: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
  }

  .sidebar-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(2px);
    transition: all 0.2s;
    transform: translateZ(0);
    opacity: 0;
    visibility: hidden;

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }

  .main-sidebar-container:not(.main-sidebar-leave-active)+.sub-sidebar-container {
    left: var(--g-main-sidebar-width);
  }

  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: calc(var(--g-main-sidebar-actual-width) + var(--g-sub-sidebar-actual-width));
    background-color: var(--g-main-bg);
    transition: margin-left 0.3s, background-color 0.3s;

    .topbar-container {
      top: 0;
      z-index: 998;
    }

    .main {
      height: 100%;
      flex: auto;
      position: relative;
      overflow: hidden;
      transition: 0.3s;
    }

    .topbar-container+.main {
      margin: var(--g-topbar-height) 0 0;
    }
  }
}

header:not(.header-leave-active)+.wrapper {
  padding-top: var(--g-header-height);

  .sidebar-container {
    top: var(--g-header-height);

    :deep(.sidebar-logo) {
      display: none;
    }

    :deep(.el-menu) {
      padding-top: 0;
    }
  }

  .main-container {
    .topbar-container {
      top: var(--g-header-height);

      :deep(.tools) {
        display: none;
      }
    }
  }
}

// 主内容区动画
.main-enter-active {
  transition: 0.2s;
}

.main-leave-active {
  transition: 0.15s;
}

.main-enter-from {
  opacity: 0;
  margin-left: -20px;
}

.main-leave-to {
  opacity: 0;
  margin-left: 20px;
}
</style>
