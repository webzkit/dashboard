import type { AppRouteRecordRaw, AppRouteModule } from "/@/router/types";
import { DashboardRoute, RedirectRoute } from "/@/router/routes/basic";
import { PageEnum } from "/@/enums/pageEnum";
import { t } from "/@/hooks/web/useI18n";
import { LOGIN_COMPONENT, LOGIN_NAME_ROUTE } from "../constant";

// import.meta.globEager()
const modules = import.meta.globEager("./modules/**/*.ts");
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  // @ts-ignore
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: t("routes.basic.root"),
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: PageEnum.BASE_LOGIN,
  name: LOGIN_NAME_ROUTE,
  component: LOGIN_COMPONENT,
  meta: {
    title: t("routes.basic.login"),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  DashboardRoute,
  RedirectRoute,
];

export default asyncRoutes;
