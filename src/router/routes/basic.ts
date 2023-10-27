import type { AppRouteRecordRaw } from '/@/router/types';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

import {
  DASHBOARD_COMPONENT,
  LAYOUT,
  REDIRECT_COMPONENT,
  REDIRECT_NAME_ROUTE,
} from '/@/router/constant';

export const DashboardRoute = {
  path: PageEnum.BASE_HOME,
  component: LAYOUT,
  meta: {
    title: t('routes.basic.dashboard'),
    breadcrumb: false,
  },
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: DASHBOARD_COMPONENT,
      meta: {
        title: t('routes.basic.dashboard'),
        breadcrumb: false,
        hideClose: true,
      },
    },
  ],
};

export const RedirectRoute: AppRouteRecordRaw = {
  path: PageEnum.BASE_REDIRECT,
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME_ROUTE,
    breadcrumb: false,
  },
  children: [
    {
      path: `${PageEnum.BASE_REDIRECT}/:path(.*)`,
      name: REDIRECT_NAME_ROUTE,
      component: REDIRECT_COMPONENT,
      meta: {
        title: REDIRECT_NAME_ROUTE,
        breadcrumb: false,
      },
    },
  ],
};
