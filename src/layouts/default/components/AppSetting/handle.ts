import { SettingTaskEnum } from './enum';
import { useAppStore } from '/@/store/modules/app';
import { ProjectConfig } from '/#/config';

export function handleSetting(event: SettingTaskEnum, value: any) {
  const appStore = useAppStore();
  const config = handle(event, value);

  appStore.setProjectConfig(config);
}

const handle = function (
  event: SettingTaskEnum,
  value: any,
): DeepPartial<ProjectConfig> {
  switch (event) {
    case SettingTaskEnum.APP_COLOR_SCHEMA:
      return { colorSchema: value };

    case SettingTaskEnum.APP_THEME_SIZE:
      return { themeSize: value };

    case SettingTaskEnum.APP_THEME_COLOR:
      return { themeColor: value };

    case SettingTaskEnum.HEADER_FIXED:
      return { headerSetting: { fixed: value } };

    case SettingTaskEnum.HEADER_ENABLE_SIDEBAR_COLLAPSE:
      return { headerSetting: { enableSidebarCollapse: value } };

    case SettingTaskEnum.HEADER_ENABLE_BREADCRUMB:
      return { headerSetting: { enableBreadcrumb: value } };

    case SettingTaskEnum.HEADER_ENABLE_FULL_SCREEN:
      return { headerSetting: { enableFullScreen: value } };

    case SettingTaskEnum.HEADER_ENABLE_PAGE_RELOAD:
      return { headerSetting: { enablePageReload: value } };

    case SettingTaskEnum.HEADER_ENABLE_COLOR_SCHEMA:
      return { headerSetting: { enableColorSchema: value } };

    case SettingTaskEnum.HEADER_ENABLE_MULTI_TAB:
      return { headerSetting: { enableMultiTab: value } };

    case SettingTaskEnum.HEADER_ENABLE_CACHE_MULTI_TAB:
      return { headerSetting: { enableCacheMultiTab: value } };

    case SettingTaskEnum.MENU_MODE:
      return { menuSetting: { menuMode: value } };

    case SettingTaskEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } };

    case SettingTaskEnum.MENU_SHOW_LOGO:
      return { menuSetting: { showLogo: value } };

    case SettingTaskEnum.MENU_SUB_COLLAPSE:
      return { menuSetting: { subMenuCollapse: value } };

    case SettingTaskEnum.MENU_UNIQUE_OPENED:
      return { menuSetting: { subMenuUniqueOpend: value } };

    case SettingTaskEnum.MENU_SWITCH_PAGE_JUMP:
      return { menuSetting: { switchMainMenuAndPageJump: value } };

    case SettingTaskEnum.FOOTER_ENABLE_COPYRIGHT:
      return { footerSetting: { enableCopyright: value } };

    case SettingTaskEnum.FOOTER_DATE:
      return { footerSetting: { date: value } };

    case SettingTaskEnum.FOOTER_COMPANY:
      return { footerSetting: { company: value } };

    case SettingTaskEnum.FOOTER_WEBSITE:
      return { footerSetting: { website: value } };

    default:
      return {};
  }
};
