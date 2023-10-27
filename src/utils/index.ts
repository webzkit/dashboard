import { App, Plugin } from 'vue';
import { isObject } from '/@/utils/is';
import path from 'path-browserify';
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';

export function isExternalLink(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function resolveRoutePath(basePath: string, routePath: string) {
  if (isExternalLink(routePath)) {
    return routePath;
  }

  if (isExternalLink(basePath)) {
    return basePath;
  }

  return basePath ? path.resolve(basePath, routePath) : routePath;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }

  return src;
}

export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route;

  const { matched, ...opt } = route;

  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };

  return component as T & Plugin;
};
