import type { LocaleSetting, LocaleType } from "/#/config";

export const LOCALE: { [key: string]: LocaleType } = {
  VI_VN: "vi",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  showPicker: true,

  // Locale
  locale: LOCALE.EN_US,

  // Default locale
  fallback: LOCALE.EN_US,

  // available Locales
  availableLocales: [LOCALE.VI_VN, LOCALE.EN_US],
};

// locale list
export const localeList: any[] = [
  {
    text: "Vietnamese",
    locale: LOCALE.VI_VN,
  },
  {
    text: "English",
    locale: LOCALE.EN_US,
  },
];
