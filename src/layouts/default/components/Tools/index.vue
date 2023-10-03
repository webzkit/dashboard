<template>
  <div class="tools">
    <div class="buttons">
      <span v-if="getEnableFullScreen" class="item" @click="toggle">
        <el-icon>
          <icon-la-compress-arrows-alt v-if="isFullscreen" />
          <icon-la-expand v-else />
        </el-icon>
      </span>

      <span v-if="getEnablePageReload" class="item" @click.prevent="refreshTab">
        <el-icon>
          <icon-ep-refresh-right />
        </el-icon>
      </span>

      <span v-if="getEnableColorSchema" class="item" @click="changeColorSchema">
        <el-icon>
          <icon-ep-sunny v-if="getColorSchema === ThemeEnum.LIGHT" />
          <icon-ep-moon v-else />
        </el-icon>
      </span>

      <span v-if="getShowLocalePicker" class="item">
        <Locale />
      </span>

      <span class="item" @click="openedDrawerAppSetting">
        <el-icon>
          <icon-ep-setting />
        </el-icon>
      </span>
    </div>

    <el-dropdown class="user-container" size="default">
      <div class="user-wrapper">
        <el-avatar size="small">
          <el-icon>
            <icon-ep-user-filled />
          </el-icon>
        </el-avatar>
        {{ fullName }}
        <el-icon>
          <icon-ep-caret-bottom />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="user-dropdown">
          <el-dropdown-item>Dashboard</el-dropdown-item>
          <el-dropdown-item>Profile</el-dropdown-item>
          <el-dropdown-item @click.prevent="userStore.logout()"
            >Logout</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, unref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { ThemeEnum } from "/@/enums/appEnum";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import Locale from "./Locale.vue";
import { useLocale } from "/@/locales/useLocale";
import { useTabs } from "/@/hooks/web/useTabs";
import { useUserStore } from "/@/store/modules/user";

const userStore = useUserStore();
const { refreshTab } = useTabs();
const { getShowLocalePicker } = useLocale();
const { toggle, isFullscreen } = useFullscreen();
const { getColorSchema, setAppSetting } = useAppSetting();
const { getEnableFullScreen, getEnablePageReload, getEnableColorSchema } =
  useHeaderSetting();

const changeColorSchema = function () {
  setAppSetting({
    colorSchema:
      unref(getColorSchema) === ThemeEnum.DARK
        ? ThemeEnum.LIGHT
        : ThemeEnum.DARK,
  });
};

const { proxy } = getCurrentInstance() as any;
const openedDrawerAppSetting = () => {
  proxy.$eventBus.emit("openDrawerAppSetting");
};

const fullName = userStore.getInfo.full_name;
</script>

<style lang="scss" scoped>
.tools {
  display: flex;
  align-items: center;
  padding: 0 10px 0 20px;
  white-space: nowrap;

  .buttons {
    margin-right: 10px;

    .item {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      width: 34px;
      cursor: pointer;
      vertical-align: middle;

      .el-icon {
        color: var(--el-text-color-primary);
        transition: var(--el-transition-color);
      }
    }
  }
}

:deep(.user-container) {
  display: inline-block;
  height: 24px;
  line-height: 24px;
  cursor: pointer;

  .user-wrapper {
    .el-avatar {
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 4px;
    }
  }
}
</style>
