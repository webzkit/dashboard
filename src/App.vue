<template>
  <el-config-provider :locale="getElPlusLocale" :size="unref(getThemeSize)">
    <router-view
      :style="{
        '--g-main-sidebar-actual-width': mainSidebarActualWidth,
        '--g-sub-sidebar-actual-width': subSidebarActualWidth,
      }"
    />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, watch, unref, onMounted } from "vue";
import { useLocale } from "/@/locales/useLocale";
import { useTitle } from "/@/hooks/web/useTitle";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { useMenuSetting } from "./hooks/setting/useMenuSetting";
import { DisplayModeEnum } from "./enums/appEnum";
import { useThemeColor } from "./hooks/web/useThemeColor";

const { getElPlusLocale } = useLocale();

const {
  getColorSchema,
  setDisplayMode,
  getDisplayMode,
  getThemeSize,
  getThemeColor,
} = useAppSetting();

const { getMenuMode, getSubMenuCollaspe, setMenuSetting, getMenuWidth } =
  useMenuSetting();

const { setThemeColorElementPlus } = useThemeColor();

watch(
  () => unref(getMenuWidth),
  (val) => {
    document.documentElement.style.setProperty("--g-sub-sidebar-width", val);
  },
  {
    immediate: true,
  }
);

const mainSidebarActualWidth = computed(() => {
  let actualWidth: any = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--g-main-sidebar-width");
  actualWidth = parseInt(actualWidth);

  if (["head", "single"].includes(unref(getMenuMode))) {
    actualWidth = 0;
  }

  return `${actualWidth}px`;
});

const subSidebarActualWidth = computed(() => {
  //let actualWidth: any = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
  let actualWidth: any = unref(getMenuWidth);
  actualWidth = parseInt(actualWidth);

  if (unref(getSubMenuCollaspe)) {
    actualWidth = 64;
  }

  return `${actualWidth}px`;
});

watch(
  () => unref(getColorSchema),
  (val) => {
    document.documentElement.classList.value = "";
    document.documentElement.classList.add(val);
  },
  {
    immediate: true,
  }
);

watch(
  () => unref(getThemeColor),
  (val) => {
    setThemeColorElementPlus(val);
  },
  {
    immediate: true,
  }
);

watch(
  () => unref(getMenuMode),
  () => {
    document.body.setAttribute("data-menu-mode", unref(getMenuMode));
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  window.onresize = () => {
    setDisplayMode(document.documentElement.clientWidth);
  };
  // @ts-ignore
  window.onresize();
});

watch(
  () => unref(getDisplayMode),
  (value) => {
    if (value === DisplayModeEnum.MOBILE) {
      setMenuSetting({ subMenuCollapse: true });
    }

    document.body.setAttribute("data-mode", value);
  },
  {
    immediate: true,
  }
);

// Listening to page changes and dynamically changing site titles
useTitle();
</script>
