import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const blog: AppRouteModule = {
  path: '/blogs',
  name: 'Blog',
  component: LAYOUT,
  redirect: '/blogs/pages',
  meta: {
    icon: 'ep:edit',
    title: t('Blog'),
    sort: 1,
  },
  children: [
    {
      path: 'pages',
      name: 'PageBlog',
      component: () => import('/@/views/blogs/pages/index.vue'),
      meta: {
        title: t('routes.blog.page'),
      },
    },
    {
      path: 'posts',
      name: 'PostBlog',
      meta: {
        title: t('routes.blog.post'),
      },
      redirect: '/blogs/posts/index',
      children: [
        {
          path: 'index',
          name: 'IndexPostBlog',
          component: () => import('/@/views/blogs/posts/index.vue'),
          meta: {
            title: t('routes.blog.posts.list'),
          },
        },
        {
          path: 'create',
          name: 'CreatePostBlog',
          component: () => import('/@/views/blogs/posts/create.vue'),
          meta: {
            title: t('routes.blog.posts.create'),
          },
        },
      ],
    },
  ],
};

export default blog;
