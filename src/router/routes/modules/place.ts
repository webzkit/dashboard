import { LAYOUT } from "/@/router/constant";
import { AppRouteModule } from "/@/router/types";
import { t } from "/@/hooks/web/useI18n";

const place: AppRouteModule = {
  path: "/places",
  name: "Place",
  component: LAYOUT,
  redirect: "/places/wards/index",
  meta: {
    icon: "ep:place",
    title: t("routes.place.name"),
    sort: 2,
  },
  children: [
    {
      path: "provinces",
      name: "ProvincePlace",
      component: () => import("/@/views/places/provinces/index.vue"),
      meta: { title: t("routes.place.province.name") },
    },
    {
      path: "districts",
      name: "DistrictPlace",
      component: () => import("/@/views/places/districts/index.vue"),
      meta: { title: t("routes.place.district.name") },
    },
    {
      path: "wards",
      name: "WardsPlace",
      component: () => import("/@/views/places/wards/index.vue"),
      meta: { title: t("routes.place.ward.name") },
    },
  ],
};

export default place;
