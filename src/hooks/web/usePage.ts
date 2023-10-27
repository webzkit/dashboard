import { unref } from 'vue';
import { Router, useRouter } from 'vue-router';
import { REDIRECT_NAME_ROUTE } from '/@/router/constant';

export const useRedo = (router?: Router) => {
  const { replace, currentRoute } = router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);

  function redo(): Promise<boolean> {
    return new Promise(resolve => {
      if (name === REDIRECT_NAME_ROUTE) {
        resolve(false);

        return;
      }

      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name';
        params['path'] = String(name);
      } else {
        params['_redirect_type'] = 'path';
        params['path'] = fullPath;
      }

      replace({ name: REDIRECT_NAME_ROUTE, params, query }).then(() =>
        resolve(true),
      );
    });
  }

  return redo;
};
