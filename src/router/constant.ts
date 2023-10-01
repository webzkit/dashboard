/**
 * @description: default layout
 */

export const LAYOUT = () => import('/@/layouts/default/index.vue');
export const DASHBOARD_COMPONENT = () => import('/@/views/sys/index.vue');
export const REDIRECT_COMPONENT = () => import('/@/views/sys/redirect/index.vue');
export const LOGIN_COMPONENT = () => import('/@/views/sys/login/index.vue');


export const DASHBOARD_NAME_ROUTE = 'Dashboard';
export const REDIRECT_NAME_ROUTE = 'Redirect';
export const LOGIN_NAME_ROUTE = 'Login';
