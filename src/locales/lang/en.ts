import { genMessage } from '../helper';
import elPlusLocale from 'element-plus/es/locale/lang/en';
import dayjsLocale from 'dayjs/locale/en';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    // @ts-ignore
    ...genMessage(modules, 'en'),
    elPlusLocale: elPlusLocale,
  },

  dateLocale: dayjsLocale,
  dateLocaleName: 'en',
};
