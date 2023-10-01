<template>
  <div>
    <el-drawer v-model="isOpenedDrawer" title="App Setting" direction="rtl" :size="360">
      <el-divider v-if="isDisplayModePc(getDisplayMode)">Layouts</el-divider>
      <div v-if="isDisplayModePc(getDisplayMode)" class="menu-mode">
        <el-tooltip content="Sidebar mode (with main navigation)" placement="top" :show-after="500">
          <div :class="[{ active: isActiveMenuMode('side', getMenuMode) }, 'mode mode-side']"
            @click="onSettingHandle('side', SettingTaskEnum.MENU_MODE)">
            <div class="mode-container" />
            <el-icon>
              <icon-ep-check />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="Top mode" placement="top" :show-after="500">
          <div :class="['mode mode-head', { active: isActiveMenuMode('head', getMenuMode) }]"
            @click="onSettingHandle('head', SettingTaskEnum.MENU_MODE)">
            <div class="mode-container" />
            <el-icon>
              <icon-ep-check />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="Sidebar mode (without main navigation)" placement="top" :show-after="500">
          <div :class="['mode mode-single', { active: isActiveMenuMode('single', getMenuMode) }]"
            @click="onSettingHandle('single', SettingTaskEnum.MENU_MODE)">
            <div class="mode-container" />
            <el-icon>
              <icon-ep-check />
            </el-icon>
          </div>
        </el-tooltip>
      </div>

      <el-divider>Themes</el-divider>
      <div class="setting-item">
        <div class="label">
          Size
          <el-tooltip content="Set the default size of Element Plus components">
            <icon-ep-question-filled />
          </el-tooltip>
        </div>
        <el-radio-group :model-value="unref(getThemeSize)" size="small"
          @change="onSettingHandle($event, SettingTaskEnum.APP_THEME_SIZE)">
          <el-radio-button label="large">large</el-radio-button>
          <el-radio-button label="default">default</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
        </el-radio-group>
      </div>

      <div class="setting-item">
        <div class="label">Color</div>
        <ul class="theme-color">
          <li v-for="(item, index) in themeColors" :key="index"
            @click="onSettingHandle(item.color, SettingTaskEnum.APP_THEME_COLOR)"
            :style="getThemeColorStyle(item.color)">
            <el-icon style="margin: 0.1em 0.1em 0 0" :size="17" :color="getThemeColorCheckStyle(item.color)">
              <icon-ep-check />
            </el-icon>
          </li>
        </ul>
      </div>


      <el-divider>Navigation</el-divider>
      <SwitchSetting :title="`Show Logo`" :def="unref(getShowLogo)" :event="SettingTaskEnum.MENU_SHOW_LOGO" />

      <SwitchSetting :title="`Collapsed`" :def="unref(getSubMenuCollaspe)" :event="SettingTaskEnum.MENU_SUB_COLLAPSE" />

      <SwitchSetting :title="`Unique Opened`" :def="unref(getSubMenuUniqueOpened)"
        :event="SettingTaskEnum.MENU_UNIQUE_OPENED" />

      <SwitchSetting :title="`Toggle Jump`" :def="unref(getSwitchMainMenuAndPageJump)"
        :event="SettingTaskEnum.MENU_SWITCH_PAGE_JUMP" />

      <div class="setting-item">
        <div class="label">
          width
          <el-tooltip content="Set the width sub sidebar">
            <icon-ep-question-filled />
          </el-tooltip>
        </div>
        <el-radio-group :model-value="unref(getMenuWidth)" size="small"
          @change="onSettingHandle($event, SettingTaskEnum.MENU_WIDTH)">
          <template v-for="item in menuWidths">
            <el-radio-button :label="item.value">{{ item.name }}</el-radio-button>
          </template>
        </el-radio-group>
      </div>


      <el-divider>Header</el-divider>
      <SwitchSetting :title="`Fixed`" :def="unref(getFixed)" :event="SettingTaskEnum.HEADER_FIXED" />

      <SwitchSetting :title="`Sidebar Collapse`" :def="unref(getEnableSidebarCollapse)"
        :event="SettingTaskEnum.HEADER_ENABLE_SIDEBAR_COLLAPSE" />

      <SwitchSetting :title="`Breadcrumb`" :def="unref(getEnableBreadcrumb)"
        :event="SettingTaskEnum.HEADER_ENABLE_BREADCRUMB" />

      <SwitchSetting :title="`Full Screen`" :def="unref(getEnableFullScreen)"
        :event="SettingTaskEnum.HEADER_ENABLE_FULL_SCREEN" />

      <SwitchSetting :title="`Page Reload`" :def="unref(getEnablePageReload)"
        :event="SettingTaskEnum.HEADER_ENABLE_PAGE_RELOAD" />

      <SwitchSetting :title="`Color Schema`" :def="unref(getEnableColorSchema)"
        :event="SettingTaskEnum.HEADER_ENABLE_COLOR_SCHEMA" />

      <SwitchSetting :title="`Multi tabs`" :def="unref(getEnableMultiTab)"
        :event="SettingTaskEnum.HEADER_ENABLE_MULTI_TAB" />


      <el-divider>Footer</el-divider>
      <SwitchSetting title="Copyright" :def="unref(getEnableCopyright)"
        :event="SettingTaskEnum.FOOTER_ENABLE_COPYRIGHT"></SwitchSetting>

      <div class="setting-item">
        <div class="label">Date</div>
        <el-input :model-value="unref(getDateFooter)" :disabled="!unref(getEnableCopyright)"
          @input="onSettingHandle($event, SettingTaskEnum.FOOTER_DATE)" />
      </div>

      <div class="setting-item">
        <div class="label">Company</div>
        <el-input :model-value="unref(getCompanyFooter)" :disabled="!unref(getEnableCopyright)"
          @input="onSettingHandle($event, SettingTaskEnum.FOOTER_COMPANY)" />
      </div>

      <div class="setting-item">
        <div class="label">Website</div>
        <el-input :model-value="unref(getWebsiteFooter)" :disabled="!unref(getEnableCopyright)"
          @input="onSettingHandle($event, SettingTaskEnum.FOOTER_WEBSITE)" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, unref, computed } from "vue";
import { SettingTaskEnum } from "/@/layouts/default/components/AppSetting/enum";
import { handleSetting } from "/@/layouts/default/components/AppSetting/handle";
import { useHeaderSetting } from "/@/hooks/setting/useHeaderSetting";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { useThemeColor } from "/@/hooks/web/useThemeColor";
import { DisplayModeEnum } from "/@/enums/appEnum";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
import SwitchSetting from "/@/components/SwitchSetting/src/SwitchSetting.vue";
import { menuWidths } from "/@/settings/designSetting";
import { useFooterSetting } from "/@/hooks/setting/useFooterSetting";

const { themeColors } = useThemeColor();
const { getDisplayMode, getThemeSize, getThemeColor } = useAppSetting();
const {
  getFixed,
  getEnableSidebarCollapse,
  getEnableBreadcrumb,
  getEnableFullScreen,
  getEnablePageReload,
  getEnableColorSchema,
  getEnableMultiTab,
  getEnableCacheMultiTab,
} = useHeaderSetting();

const {
  getMenuMode,
  getShowLogo,
  getSubMenuCollaspe,
  getSubMenuUniqueOpened,
  getSwitchMainMenuAndPageJump,
  getMenuWidth,
} = useMenuSetting();

const {
  getEnableCopyright,
  getDateFooter,
  getCompanyFooter,
  getWebsiteFooter
} = useFooterSetting();

const { proxy } = getCurrentInstance() as any;
const isOpenedDrawer = ref(false);
onMounted(() => {
  proxy.$eventBus.on("openDrawerAppSetting", () => {
    isOpenedDrawer.value = !isOpenedDrawer.value
  });
});

const isDisplayModePc = (value: string) => value === DisplayModeEnum.PC;

const onSettingHandle = function (value: any, event: any) {
  handleSetting(event, value);
};

const isActiveMenuMode = function (kind: string, menuMode: string): boolean {
  return kind === menuMode;
};

const getThemeColorStyle = computed(() => {
  return (color: string | any) => {
    return { background: color }
  }
});
const getThemeColorCheckStyle = computed(() => {
  return (color: string | any) => {
    if (unref(getThemeColor) !== color) {
      return "transparent"
    }

    return "#ffffff";
  }
});
</script>


<style lang="scss" scoped>
:deep(.el-drawer__header) {
  margin-bottom: initial;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color);
}

:deep(.el-drawer__footer) {
  padding: 20px;
  border-top: 1px solid var(--el-border-color);
  transition: var(--el-transition-border);

  .el-button {
    width: 100%;
  }
}

:deep(.el-divider) {
  margin: 36px 0 24px;
}

.menu-mode {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;

  .mode {
    position: relative;
    width: 80px;
    height: 55px;
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    background-color: var(--g-app-bg);
    box-shadow: 0 0 5px 1px var(--el-border-color-lighter);
    transition: 0.2s;

    &:hover {
      box-shadow: 0 0 5px 1px var(--el-border-color-darker);
    }

    &.active {
      box-shadow: 0 0 0 2px var(--el-color-primary);
    }

    &::before,
    &::after,
    .mode-container {
      pointer-events: none;
      position: absolute;
      border-radius: 3px;
    }

    .mode-container::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--g-sub-sidebar-menu-active-bg);
      opacity: 0.2;
    }

    &-side {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 10px;
        background-color: var(--g-sub-sidebar-menu-active-bg);
      }

      &::after {
        content: "";
        top: 5px;
        left: 20px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-sub-sidebar-menu-active-bg);
        opacity: 0.5;
      }

      .mode-container {
        top: 5px;
        left: 40px;
        right: 5px;
        bottom: 5px;
        border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
      }
    }

    &-head {
      &::before {
        content: "";
        top: 5px;
        left: 5px;
        right: 5px;
        height: 10px;
        background-color: var(--g-sub-sidebar-menu-active-bg);
      }

      &::after {
        content: "";
        top: 20px;
        left: 5px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-sub-sidebar-menu-active-bg);
        opacity: 0.5;
      }

      .mode-container {
        top: 20px;
        left: 25px;
        right: 5px;
        bottom: 5px;
        border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
      }
    }

    &-single {
      &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        bottom: 5px;
        width: 15px;
        background-color: var(--g-sub-sidebar-menu-active-bg);
        opacity: 0.5;
      }

      .mode-container {
        top: 5px;
        left: 25px;
        right: 5px;
        bottom: 5px;
        border: 1px dashed var(--g-sub-sidebar-menu-active-bg);
      }
    }

    i {
      position: absolute;
      right: 10px;
      bottom: 10px;
      display: none;
    }

    &.active i {
      display: block;
      color: var(--el-color-primary);
    }
  }
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background: var(--el-fill-color);
  }

  .label {
    font-size: 14px;
    color: var(--el-text-color-regular);
    display: flex;
    align-items: center;

    i,
    svg {
      margin-left: 4px;
      font-size: 14px;
      color: var(--el-color-warning);
      cursor: help;
    }
  }

  .el-input {
    width: 150px;
  }
}

.theme-color {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: right;

  li {
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 8px;
    margin-left: 8px;
    font-weight: 700;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:nth-child(2) {
      border: 1px solid #ddd;
    }
  }
}
</style>
