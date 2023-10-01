import { CacheTypeEnum } from "/@/enums/cacheEnum";

export type LocaleType = 'vi' | 'en' | 'ja' | 'zh_CN'

export type designKeys = 'name' | 'value' | 'color';
export type designType = {
  [key in designKeys]?: string
}

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';


export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface MenuSetting {
  showLogo: boolean;
  // the default value 220px
  menuWidth: string;

  // The value accept <side, single, head>
  menuMode: string;

  // switch the main navigation and jump to the page at the same time
  switchMainMenuAndPageJump: boolean,

  // The default is true
  subMenuUniqueOpend: boolean,

  // The default value is false
  subMenuCollapse: boolean,
}


export interface HeaderSetting {
  // The default value is true
  fixed: boolean;

  // The default value is true
  enableSidebarCollapse: boolean;

  // The default value is true1
  enableBreadcrumb: boolean;

  enableFullScreen: boolean;
  enablePageReload: boolean;

  // Whether to show the theme switch button
  enableColorSchema: boolean;


  enableMultiTab: boolean;
  enableCacheMultiTab: boolean;

  // Whether to show the configuration button
  enableSetting: boolean;
  enableSearch?: boolean;
  enableNotice?: boolean;
  enableDoc?: boolean;
}


export interface FooterSetting {
  enableCopyright: boolean,
  date: string,
  company: string,
  website: string,
}

export interface ElePlusSetting {
  duration: number,
  notificatonPosition: NotificationPosition,
}


export interface ProjectConfig {
  // The default value is frontend
  routeBaseOn: string,

  // The default value is light
  colorSchema: string;

  // Enable mobile application, the default value is true
  enableMobile: boolean;

  // Display is Pc and mobile, the default is Pc
  displayMode: string;

  // The element plus size and value default is Default
  themeSize: string;

  // The color of theme
  themeColor: string;

  //Display is Pc and mobile, the default is Pc
  displayMode: string;

  userCacheType: CacheTypeEnum;

  menuSetting: MenuSetting;
  headerSetting: HeaderSetting;
  footerSetting: FooterSetting;
  elePlusSetting: ElePlusSetting;
}

export interface GlobConfig {
  // Site title
  title: string;

  // Service interface url
  apiUrl: string;

  // Upload url
  uploadUrl?: string;

  //  Service interface url prefix
  urlPrefix?: string;

  // Project abbreviation
  shortName: string;
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;

  // Service interface url
  VITE_GLOB_API_URL: string;

  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;

  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;

  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
