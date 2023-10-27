import { defineStore } from 'pinia';
import { unref } from 'vue';
import { MenuModeEnum, RouteBaseOnEnum } from '/@/enums/appEnum';
import { useAppSetting } from '/@/hooks/setting/useAppSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRouteSetting } from '/@/hooks/setting/useRouteSetting';
import { resolveRoutePath } from '/@/utils';
import type { Menu } from '/#/global';

interface MenuState {
  menus: Menu.recordMainRaw[];
  actived: number;
}

const getDeepestPath = function (routes: any, rootPath: string = ''): string {
  if (!routes.children) {
    return resolveRoutePath(rootPath, routes.path);
  }

  if (
    routes.children.some((item: any) => {
      return item.meta.sidebar != false;
    })
  ) {
    for (let i = 0; i < routes.children.length; i++) {
      if (routes.children[i].meta.sidebar != false) {
        return getDeepestPath(
          routes.children[i],
          resolveRoutePath(rootPath, routes.path),
        );
      }
    }
  }

  return getDeepestPath(
    routes.children[0],
    resolveRoutePath(rootPath, routes.path),
  );
};

export const useMenuStore = defineStore({
  id: 'app-menu',

  state: (): MenuState => ({
    menus: [{ meta: {}, children: [] }],
    actived: 0,
  }),

  getters: {
    getMenus(): any[] {
      let menus: any[] = [];
      const appSetting = useAppSetting();
      const menuSetting = useMenuSetting();

      if (appSetting.getRouteBaseOn.value === RouteBaseOnEnum.FILE_SYSTEM) {
        return this.menus;
      }

      const routeSetting = useRouteSetting();
      if (menuSetting.getMenuMode.value === MenuModeEnum.SINGLE) {
        menus = [{ children: [] }];
        routeSetting.routeStore.getRoutes.map(item => {
          menus[0].children?.push(...item.children);
          console.log(item.children);
        });

        return menus;
      }

      return routeSetting.getRoutes.value;
    },

    // The secondary navogation
    getSidebarMenus(): string[] {
      return this.getMenus.length > 0
        ? this.getMenus[this.actived].children
        : [];
    },

    // The path of the first navigation in the secondary navigation
    sidebarMenuFirstDeepestPath() {
      return this.getMenus.length > 0
        ? getDeepestPath(this.getSidebarMenus[0])
        : '/';
    },

    defaultOpenedPaths() {
      const appSetting = useAppSetting();
      const defaultOpenedpaths: string[] = [];

      if (unref(appSetting.getRouteBaseOn) === RouteBaseOnEnum.FILE_SYSTEM) {
        return defaultOpenedpaths;
      }

      const routeSetting = useRouteSetting();
      routeSetting.routeStore.getRoutes.map((item: any) => {
        item.meta.defaultOpened && defaultOpenedpaths.push(item.path);
        item.children &&
          item.children.map((child: any) => {
            child.meta.defaultOpened &&
              defaultOpenedpaths
                .push
                //pathBrowserify.resolve(item.path, child.path),
                ();
          });
      });

      return defaultOpenedpaths;
    },
  },

  actions: {
    setActived(data: any) {
      if (typeof data === 'number') {
        this.actived = data;
      } else {
        this.getMenus.map((item, index) => {
          if (
            item.children.some((r: any) => {
              return data.indexOf(r.path + '/') === 0 || data === r.path;
            })
          ) {
            this.actived = index;
          }
        });
      }
    },
  },
});
