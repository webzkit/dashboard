<template>
  <transition name="header">
    <header v-if="isShow">
      <div class="header-container">
        <div class="main">
          <Logo />

          <div class="nav">
            <template v-for="(item, index) in items">
              <div
                v-if="item.children && item.children.length !== 0"
                :key="index"
                :class="['item', { active: isActive(index) }]"
                @click="switchMenu(index)"
              >
                <Icon :icon="item.icon" />
                <span v-if="item.title" v-html="item.title" />
              </div>
            </template>
          </div>
        </div>
        <Tools />
      </div>
    </header>
  </transition>
</template>

<script setup lang="ts">
import { computed, inject, unref } from "vue";
import Logo from "../Logo/index.vue";
import { DisplayModeEnum, MenuModeEnum } from "/@/enums/appEnum";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import Icon from "/@/components/Icon";
import { map, get } from "lodash";
import { useI18n } from "/@/hooks/web/useI18n";
import Tools from "../Tools/index.vue";

const { t } = useI18n();
const { getDisplayMode } = useAppSetting();
const { getMenuMode, getMenus, getActiveMenu } = useMenuSetting();

const isShow = computed(() => {
  return (
    unref(getDisplayMode) === DisplayModeEnum.PC &&
    unref(getMenuMode) === MenuModeEnum.HEAD
  );
});

const items = map(unref(getMenus), (item) => {
  return {
    title: t(get(item, "meta.title", "")),
    icon: get(item, "meta.icon", "ep:home-filled"),
    children: get(item, "children", []),
  };
});

const isActive = function (index: number): boolean {
  return index === unref(getActiveMenu);
};

const switchMenu = inject("switchMenu");
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: var(--g-header-height);
  color: var(--g-header-color);
  background-color: var(--g-header-bg);
  transition:
    background-color 0.3s,
    var(--el-transition-color);

  .header-container {
    width: var(--g-header-width);
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  @media screen and (max-width: var(--g-header-width)) {
    .header-container {
      width: 100%;
    }
  }

  :deep(.title) {
    position: relative;
    width: inherit;
    height: inherit;
    padding: inherit;
    background-color: inherit;

    .logo {
      width: 50px;
      height: 50px;
    }

    span {
      font-size: 20px;
      letter-spacing: 1px;
      color: var(--g-header-color);
    }
  }

  .nav {
    display: flex;
    height: 100%;
    margin-left: 50px;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 5px;
      width: 80px;
      cursor: pointer;
      color: var(--g-header-menu-color);
      background-color: var(--g-header-bg);
      transition:
        background-color 0.3s,
        var(--el-transition-color);

      &:hover {
        color: var(--g-header-menu-hover-color);
        background-color: var(--g-header-menu-hover-bg);
      }

      &.active {
        color: var(--g-header-menu-active-color);
        background-color: var(--g-header-menu-active-bg);
      }

      .el-icon {
        font-size: 24px;
        vertical-align: middle;
      }

      span {
        text-align: center;
        vertical-align: middle;
        word-break: break-all;
        @include text-overflow(1, false);
      }
    }
  }

  :deep(.tools) {
    padding: 0;

    .buttons .item .el-icon {
      color: var(--g-header-color);
    }

    .user-container {
      font-size: 16px;
      color: var(--g-header-color);
    }
  }
}

.header-enter-active,
.header-leave-active {
  transition: transform 0.3s;
}

.header-enter-from,
.header-leave-to {
  transform: translateY(calc(var(--g-header-height) * -1));
}
</style>
