import { genMessage } from '/@/locales/helper';
import elPlusLocale from 'element-plus/es/locale/lang/vi';
import dayjsLocale from 'dayjs/locale/vi';

const modules = import.meta.globEager('./vi/**/*.ts');

export default {
  message: {
    // @ts-ignore
    ...genMessage(modules, 'vi'),
    elPlusLocale: elPlusLocale,
  },

  dateLocale: dayjsLocale,
  dateLocaleName: 'vi',
};
