import type { MenuSetting } from '../../../types/config';
import { computed } from 'vue';
import { useAppStore } from '../../store/modules/app';
import { useMenuStore } from '/@/store/modules/menu';

export function useMenuSetting() {
  const appStore = useAppStore();
  const menuStore = useMenuStore();

  // Menu config
  const getMenuMode = computed(() => appStore.getMenuSetting.menuMode);
  const getSwitchMainMenuAndPageJump = computed(
    () => appStore.getMenuSetting.switchMainMenuAndPageJump,
  );
  const getSubMenuUniqueOpened = computed(
    () => appStore.getMenuSetting.subMenuUniqueOpend,
  );
  const getSubMenuCollaspe = computed(
    () => appStore.getMenuSetting.subMenuCollapse,
  );
  const getShowLogo = computed(() => appStore.getMenuSetting.showLogo);
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  // Menu Store
  const getMenus = computed(() => menuStore.getMenus);
  const getSidebarMenus = computed(() => menuStore.getSidebarMenus);
  const getDefaultOpenedPaths = computed(() => menuStore.defaultOpenedPaths);
  const getActiveMenu = computed(() => menuStore.actived);

  const setMenuSetting = function (menuSetting: Partial<MenuSetting>) {
    appStore.setProjectConfig({ menuSetting });
  };

  return {
    // Menu Setting
    setMenuSetting,

    getMenuMode,
    getSwitchMainMenuAndPageJump,
    getSubMenuUniqueOpened,
    getSubMenuCollaspe,
    getMenuWidth,
    getShowLogo,

    // Menu Store
    menuStore,
    getMenus,
    getSidebarMenus,
    getDefaultOpenedPaths,
    getActiveMenu,
  };
}
