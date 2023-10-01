import { CacheTypeEnum } from "../enums/cacheEnum";
import { colorTheme } from "./designSetting";
import { ProjectConfig } from "/#/config";
import { DisplayModeEnum, MenuWidthEnum, RouteBaseOnEnum, ThemeEnum, ThemeSizeEnum } from "/@/enums/appEnum";


// Must need to clear the browser cache after the change
const setting: ProjectConfig = {
  routeBaseOn: RouteBaseOnEnum.FRONTEND, // todo next task get file .env
  colorSchema: ThemeEnum.LIGHT,
  displayMode: DisplayModeEnum.PC,
  enableMobile: true,
  themeSize: ThemeSizeEnum.DEFAULT,
  themeColor: colorTheme,
  userCacheType: CacheTypeEnum.LOCAL,

  // Header configuration
  headerSetting: {
    fixed: true,
    enableSidebarCollapse: true,
    enableBreadcrumb: false,
    enableFullScreen: false,
    enablePageReload: false,
    enableColorSchema: true,

    enableMultiTab: true,
    enableCacheMultiTab: true,

    enableSetting: true, //todo next get file .env
  },

  // Menu configuration
  menuSetting: {
    showLogo: true,
    menuWidth: MenuWidthEnum.W_220,
    menuMode: 'side',

    switchMainMenuAndPageJump: false,
    subMenuUniqueOpend: true,
    subMenuCollapse: false,
  },

  // Footer setting
  footerSetting: {
    enableCopyright: true,
    company: 'Webzkit',
    date: '2022 - 2025',
    website: 'https://webzkit.com'
  },

  // Element plus setting
  elePlusSetting: {
    duration: 3000,
    notificatonPosition: 'bottom-right',
  }
}


export default setting;
