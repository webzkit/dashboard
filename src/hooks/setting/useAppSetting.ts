import type { ProjectConfig } from "/#/config";
import { computed } from "vue";
import { useAppStore } from "/@/store/modules/app";

export function useAppSetting() {
  const appStore = useAppStore();

  const setAppSetting = function (setting: Partial<ProjectConfig>) {
    appStore.setProjectConfig(setting);
  };

  const setDisplayMode = function (width: number) {
    appStore.setMode(width);
  };

  const getColorSchema = computed(() => appStore.getProjectConfig.colorSchema);
  const getRouteBaseOn = computed(() => appStore.getProjectConfig.routeBaseOn);
  const getDisplayMode = computed(() => appStore.getProjectConfig.displayMode);
  const getEnableMobile = computed(
    () => appStore.getProjectConfig.enableMobile
  );
  const getThemeSize = computed(() => appStore.getProjectConfig.themeSize);
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor);

  return {
    setAppSetting,
    setDisplayMode,

    getColorSchema,
    getRouteBaseOn,
    getDisplayMode,
    getEnableMobile,
    getThemeSize,
    getThemeColor,
  };
}
