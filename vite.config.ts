import type { UserConfig, ConfigEnv } from "vite";
import pkg from "./package.json";
import moment from 'moment';
import { loadEnv } from "vite";
import { resolve } from "path";
import { createVitePlugin } from "./build/vite/plugin";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";
import { createPreprocessor } from "./build/vite/preprocessor";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root: root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        }
      ]
    },

    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },

    define: {
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __VUE_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },

    plugins: createVitePlugin(viteEnv, isBuild),

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: createPreprocessor()
        }
      }
    },

    optimizeDeps: {
      include: [
        '@iconify/iconify',
        'dayjs/locale/vi',
        'dayjs/locale/en'
      ]
    }
  }
};
