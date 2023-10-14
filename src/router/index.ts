import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes, asyncRoutes } from "/@/router/routes";
import { useAppSetting } from "../hooks/setting/useAppSetting";
import { useRouteSetting } from "../hooks/setting/useRouteSetting";
import { RouteBaseOnEnum } from "../enums/appEnum";
import { get } from "lodash";
import { useUserStore } from "../store/modules/user";
import { LOGIN_NAME_ROUTE } from "./constant";
import { useMenuStore } from "../store/modules/menu";

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// @ts-ignore
router.beforeEach(async (to, form, next) => {
  const appSetting = useAppSetting();
  const routeSetting = useRouteSetting();
  const { setActived } = useMenuStore();
  const { getAccessToken } = useUserStore();

  if (!getAccessToken) {
    if (to.name != LOGIN_NAME_ROUTE) {
      return next({
        name: LOGIN_NAME_ROUTE,
        query: {
          redirect: to.fullPath,
        },
      });
    }

    return next();
  }

  if (routeSetting.getIsGenerate.value) {
    setActived(to.path);
    // todo
    return next();
  }

  switch (appSetting.getRouteBaseOn.value) {
    case RouteBaseOnEnum.FRONTEND:
      await routeSetting.routeStore.generateRouteAtFrontend(asyncRoutes);
      break;

    case RouteBaseOnEnum.BACKEND:
      break;

    case RouteBaseOnEnum.FILE_SYSTEM:
      break;
  }

  let removeRoutes: string[] = [];
  routeSetting.routeStore.getFlatRoutes.forEach((route) => {
    if (!/^(https?:|mailto:|tel:)/.test(get(route, "path", ""))) {
      // @ts-ignore
      removeRoutes.push(router.addRoute(route));
    }
  });

  routeSetting.routeStore.setCurrentRemoveRoute(removeRoutes);

  next({
    path: to.fullPath,
    query: to.query,
    replace: true,
  });
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
