import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html';
import { configPwaPlugin } from "./pwa";
import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from './compress';
import { configAutoImport } from "./auto-import";
import { configAutoImportComponents } from "./components";
import { configIconPlugin } from "./icon";


export function createVitePlugin(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // Must have
    vue(),

    // Must have
    vueJsx(),

    // Support name
    vueSetupExtend()
  ];

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // auto-import
  vitePlugins.push(configAutoImport());
  vitePlugins.push(configAutoImportComponents());
  vitePlugins.push(configIconPlugin());


  // The following plugins only work in the production environment
  if (isBuild) {
    // Vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // Rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );

    vitePlugins.push(configPwaPlugin(viteEnv));
  }

  return vitePlugins;
}
