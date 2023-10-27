import type {
  //ComponentRenderProxy,
  ComponentPublicInstance,
  FunctionalComponent,
} from 'vue';

declare global {
  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  declare type Nullable<T> = T | null;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };

  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_PROXY: [string, string][];
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_USE_PWA: boolean;
    VITE_LEGACY: boolean;
    VITE_USE_IMAGEMIN: boolean;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    sidebar?: boolean;
    breadcrumbNeste?: any[];
  }
}

declare namespace Menu {
  interface recordRaw {
    path?: string;
    meta?: {
      title?: string;
      icon?: string;
      defaultOpened?: boolean;
      auth?: string | string[];
      sidebar?: boolean;
      link?: string;
    };
    children?: recordRaw[];
  }

  interface recordMainRaw {
    meta?: {
      title?: string;
      icon?: string;
      auth?: string | string[];
    };
    children: recordRaw[];
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
