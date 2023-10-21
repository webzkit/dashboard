import { TinyColor } from '@ctrl/tinycolor';
import { ref } from 'vue';
import { designType } from '/#/config';
import { colorThemes } from '/@/settings/designSetting';

export function useThemeColor() {
  const themeColors = ref<Array<designType>>(colorThemes);

  const bodyElement = document.documentElement as HTMLElement;

  const shadeBgColor = (color: string): string => {
    return new TinyColor(color).shade(10).toString();
  };

  const setThemeColorElementPlus = (color: string): void => {
    bodyElement.style.setProperty(
      '--el-color-primary-active',
      shadeBgColor(color),
    );
    bodyElement.style.setProperty('--el-color-primary', color);

    const colorTiny = new TinyColor(color);

    for (let i = 1; i < 10; i++) {
      bodyElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        new TinyColor(color).lighten(i * 3 + 10).toHexString(),
      );

      if (i < 3) {
        bodyElement.style.setProperty(
          `--el-color-primary-dark-${i}`,
          colorTiny.darken(i * 3 + 20).toHexString(),
        );
      }
    }
  };

  return {
    themeColors,
    shadeBgColor,
    setThemeColorElementPlus,
  };
}
