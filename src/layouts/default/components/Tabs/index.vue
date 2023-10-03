<template>
  <div class="tabs">
    <el-scrollbar
      class="scroll-container tags-view-container"
      ref="scrollbarDom"
    >
      <template v-for="tab in getRouteMultiTabs" :key="tab.meta.title">
        <ItemTab :menu="tab" :active="activeTab(tab)" @close="closeTab(tab)" />
      </template>
    </el-scrollbar>

    <ul class="right-button">
      <li>
        <el-icon @click.stop="reloadTab" class="rotate">
          <icon-ep-refresh-right />
        </el-icon>
      </li>
      <li>
        <ActionTab />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { unref } from "vue";
import { RouteLocationNormalized, useRoute, useRouter } from "vue-router";
import ItemTab from "./ItemTab.vue";
import ActionTab from "./ActionTab.vue";
import { PageEnum } from "/@/enums/pageEnum";
import { useTabs } from "/@/hooks/web/useTabs";

const { getRouteMultiTabs, addTab, refreshTab, closeTab } = useTabs();

const router = useRouter();
const route = useRoute();

let activeTab = (tab: RouteLocationNormalized): boolean => {
  const { path } = unref(router.currentRoute);

  return tab.path === path;
};

if (getRouteMultiTabs.value.length === 0) {
  const dashboard = router.resolve({ path: PageEnum.BASE_HOME });

  addTab(dashboard);
}

router.afterEach(() => {
  addTab(route);
});

const reloadTab = () => {
  const rotate = document.querySelector(".rotate");
  rotate?.classList.add("rotate-animation");
  refreshTab();
  setTimeout(() => {
    rotate?.classList.remove("rotate-animation");
  }, 600);
};

addTab(route);
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  background: var(--g-sub-sidebar-bg);
  border-bottom: 1px solid var(--el-border-color);
  border-top: 1px solid var(--el-border-color);
  box-shadow: 0 1px 20px 0 var(--g-box-shadow-color);
  transition:
    background-color 0.3s,
    var(--el-transition-box-shadow),
    left 0.3s,
    width 0.3s;

  .right-button {
    display: flex;
    font-size: 16px;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 38px;
      border-left: 1px solid var(--el-border-color);
      cursor: pointer;

      .el-icon {
        color: var(--el-text-color-primary);
      }

      &:last-child {
        width: 38px;
      }
    }
  }
}

.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }

  :deep(.el-scrollbar__wrap) {
    height: auto;
  }
}

.tags-view-container {
  height: 34px;
  flex: 1;
  width: 100%;
  display: flex;
}
</style>
