import { computed, unref } from 'vue';
import { RouteLocationNormalized, Router, useRouter } from 'vue-router';
import { TabActionEnum } from '/@/enums/appEnum';
import { useAppStore } from '/@/store/modules/app';
import { useMultiTabStore } from '/@/store/modules/tab';

export function useTabs(_router?: Router) {
  const appStore = useAppStore();
  const tabStore = useMultiTabStore();
  const router = _router || useRouter();

  const getRouteMultiTabs = computed(() => tabStore.getRouteMultiTabs);

  const hasUseTabs = (): boolean => {
    const { enableMultiTab } = appStore.getHeaderSetting;

    if (!enableMultiTab) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings！',
      );
    }

    return !!enableMultiTab;
  };

  const { currentRoute } = router;

  const getCurrentTab = (): RouteLocationNormalized => {
    const route = unref(currentRoute);

    return tabStore.getRouteMultiTabs.find(
      item => item.fullPath === route.fullPath,
    )!;
  };

  const handleTabAction = async (
    action: TabActionEnum,
    tab?: RouteLocationNormalized,
  ) => {
    if (!hasUseTabs) {
      return;
    }

    const currentTab = getCurrentTab();

    switch (action) {
      case TabActionEnum.ADD:
        await tabStore.addTab(tab || currentTab);
        break;

      case TabActionEnum.REFRESH:
        await tabStore.refreshPage(router);
        break;

      case TabActionEnum.CLOSE:
      case TabActionEnum.CLOSE_CURRENT:
        await tabStore.closeTab(tab || currentTab, router);
        break;

      case TabActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router);
        break;

      case TabActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTab(currentTab);
        break;

      case TabActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTab(currentTab);
        break;

      case TabActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTab(currentTab);
        break;
    }
  };

  return {
    getRouteMultiTabs,
    addTab: (tab: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.ADD, tab),

    refreshTab: () => handleTabAction(TabActionEnum.REFRESH),
    closeCurrentTab: () => handleTabAction(TabActionEnum.CLOSE_CURRENT),
    closeTab: (tab?: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE, tab),
    closeAllTab: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeOtherTab: () => handleTabAction(TabActionEnum.CLOSE_OTHER),
    closeLeftTab: () => handleTabAction(TabActionEnum.CLOSE_LEFT),
    closeRightTab: () => handleTabAction(TabActionEnum.CLOSE_RIGHT),
  };
}
