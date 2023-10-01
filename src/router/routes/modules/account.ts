import { LAYOUT } from '../../constant';
import { AppRouteModule } from '../../types';
import { t } from '/@/hooks/web/useI18n';


const account: AppRouteModule = {
  path: '/accounts',
  name: 'Account',
  component: LAYOUT,
  redirect: '/accounts/users',
  meta: {
    icon: 'carbon:group',
    title: t('User'),
    sort: 2,
  },
  children: [
    {
      path: 'users',
      name: 'UserAccount',
      component: () => import('/@/views/accounts/users/index.vue'),
      meta: {
        title: t('routes.account.user'),
      },
    },
    {
      path: 'groups',
      name: 'GroupAccount',
      component: () => import('/@/views/accounts/groups/index.vue'),
      meta: {
        title: t('routes.account.group'),
      },
    },
  ]
};


export default account;

