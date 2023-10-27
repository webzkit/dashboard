/**
 * Auto import APIs on-demand for Vite, Webpack, Rollup and esbuild. With TypeScript support.
 * https://github.com/antfu/unplugin-auto-import
 */
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configAutoImport() {
  return autoImport({
    imports: ['pinia'],

    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },

    resolvers: [ElementPlusResolver()],
    vueTemplate: false,
    dts: false,
  });
}
