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
            redirect: "/places/provinces/index",
            meta: { title: t("routes.place.province.name") },
            children: [
                {
                    path: "index",
                    name: "IndexProvincePlace",
                    component: () => import("/@/views/places/provinces/index.vue"),
                    meta: { title: "routes.place.province.index" },
                },
            ],
        },
        {
            path: "districts",
            name: "DistrictPlace",
            redirect: "/places/districts/index",
            meta: { title: t("routes.place.district.name") },
            children: [
                {
                    path: "index",
                    name: "IndexDistrictPlace",
                    component: () => import("/@/views/places/districts/index.vue"),
                    meta: { title: t("routes.place.district.index") },
                },
            ],
        },
        {
            path: "wards",
            name: "WardsPlace",
            redirect: "/places/wards/index",
            meta: { title: t("routes.place.wards.name") },
            children: [
                {
                    path: "index",
                    name: "IndexWardsPlace",
                    component: () => import("/@/views/places/wards/index.vue"),
                    meta: { title: t("routes.place.wards.index") },
                },
            ],
        },
    ],
};

export default place;
