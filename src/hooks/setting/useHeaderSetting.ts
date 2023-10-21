import type { HeaderSetting } from '/#/config';
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';

export function useHeaderSetting() {
  const appStore = useAppStore();

  const setHeaderSetting = function (headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting });
  };

  const getFixed = computed(() => appStore.getHeaderSetting.fixed);
  const getEnableSidebarCollapse = computed(
    () => appStore.getHeaderSetting.enableSidebarCollapse,
  );
  const getEnableBreadcrumb = computed(
    () => appStore.getHeaderSetting.enableBreadcrumb,
  );
  const getEnableFullScreen = computed(
    () => appStore.getHeaderSetting.enableFullScreen,
  );
  const getEnablePageReload = computed(
    () => appStore.getHeaderSetting.enablePageReload,
  );
  const getEnableColorSchema = computed(
    () => appStore.getHeaderSetting.enableColorSchema,
  );
  const getEnableMultiTab = computed(
    () => appStore.getHeaderSetting.enableMultiTab,
  );
  const getEnableCacheMultiTab = computed(
    () => appStore.getHeaderSetting.enableCacheMultiTab,
  );

  return {
    setHeaderSetting,

    getFixed,
    getEnableSidebarCollapse,
    getEnableBreadcrumb,
    getEnableFullScreen,
    getEnablePageReload,
    getEnableColorSchema,
    getEnableMultiTab,
    getEnableCacheMultiTab,
  };
}
