<template>
  <div
    :class="[{ fixed: getFixed, shadow: scrollTop }, 'topbar-container']"
    data-fixed-calc-width
  >
    <div class="left-box">
      <div
        v-if="getEnableSidebarCollapse"
        :class="[{ 'is-collapse': getSubMenuCollaspe }, 'sidebar-collapse']"
        @click="toogleSidebarCollapse"
      >
        <el-icon>
          <icon-ep-expand />
        </el-icon>
      </div>

      <el-breadcrumb v-if="isShowBreadcrumb">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbes"
            :key="item.path"
            :to="index < breadcrumbes.length - 1 ? compilePath(item.path) : ''"
          >
            {{ t(item.title) }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <Tools />
  </div>
</template>

<script lang="ts" setup>
import { get } from "lodash";
import { computed, onMounted, onUnmounted, ref, unref } from "vue";
import { useRoute } from "vue-router";
import { compile } from "path-to-regexp";
import Tools from "../Tools/index.vue";
import { DisplayModeEnum, RouteBaseOnEnum } from "/@/enums/appEnum";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import { useI18n } from "/@/hooks/web/useI18n";

const route = useRoute();
const { t } = useI18n();
const { getDisplayMode, getRouteBaseOn, getEnableMobile } = useAppSetting();
const { getFixed, getEnableSidebarCollapse, getEnableBreadcrumb } =
  useHeaderSetting();
const { setMenuSetting, getSubMenuCollaspe } = useMenuSetting();

const scrollTop = ref(0);
const onScroll = function () {
  scrollTop.value =
    document.documentElement.scrollTop || document.body.scrollTop;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const toogleSidebarCollapse = function () {
  setMenuSetting({ subMenuCollapse: !unref(getSubMenuCollaspe) });
};

const isShowBreadcrumb = computed(() => {
  return (
    unref(getEnableBreadcrumb) &&
    unref(getDisplayMode) === DisplayModeEnum.PC &&
    unref(getRouteBaseOn) !== RouteBaseOnEnum.FILE_SYSTEM
  );
});

const breadcrumbes = computed(() => {
  let results: any[] = [];
  if (unref(getEnableMobile)) {
    results.push({
      path: "/dashboard",
      title: "Home",
    });
  }

  if (route.meta.breadcrumbNeste) {
    // @ts-ignore
    results.push(
      ...route.meta.breadcrumbNeste.filter(
        (item: any) => get(item, "hide", false) === false,
      ),
    );
  }

  return results;
});

const compilePath = function (path: string): string {
  let toPath = compile(path);

  return toPath(route.params);
};
</script>

<style lang="scss" scoped>
.topbar-container {
  position: absolute;
  z-index: 999;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--g-topbar-height);
  background-color: var(--g-toolbar-bg);
  transition:
    width 0.3s,
    top 0.3s,
    transform 0.3s,
    background-color 0.3s,
    var(--el-transition-box-shadow);

  &.fixed {
    position: fixed;

    &.shadow {
      box-shadow: 0 10px 10px -10px var(--g-box-shadow-color);
    }
  }

  .left-box {
    display: flex;
    align-items: center;
    padding-right: 50px;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(
      90deg,
      #000 0%,
      #000 calc(100% - 50px),
      transparent
    );
    mask-image: linear-gradient(
      90deg,
      #000 0%,
      #000 calc(100% - 50px),
      transparent
    );

    .sidebar-collapse {
      display: flex;
      align-items: center;
      padding: 0 20px 0 15px;
      height: 50px;
      cursor: pointer;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color), var(--el-transition-md-fade);
      }

      &:hover .el-icon {
        color: var(--el-color-primary);
      }

      &.is-collapse .el-icon {
        transform: rotateZ(-180deg);
      }

      & + .el-breadcrumb {
        margin-left: 0;
      }
    }

    :deep(.el-breadcrumb) {
      margin-left: 20px;
      white-space: nowrap;

      .el-breadcrumb__item {
        display: inline-block;
        float: none;

        span {
          font-weight: normal;
        }

        &:last-child span {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

.breadcrumb-enter-active {
  transition: all 0.25s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
