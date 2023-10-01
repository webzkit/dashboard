import path from "path";
import { defineStore } from "pinia";
import { toRaw, unref } from "vue";
import { RouteLocationNormalized, RouteLocationRaw, Router } from "vue-router";
import { MULTIPLE_TABS_KEY } from "/@/enums/cacheEnum";
import { PageEnum } from "/@/enums/pageEnum";
import { useRedo } from "/@/hooks/web/usePage";
import { DASHBOARD_NAME_ROUTE, REDIRECT_NAME_ROUTE } from "/@/router/constant";
import projectSetting from '/@/settings/projectSetting';
import { getRawRoute } from "/@/utils";
import { Persistent } from "/@/utils/cache/persistent";


interface MultiTabState {
  routeName: Set<string>,
  routeMultiTabs: RouteLocationNormalized[];
}


const cacheTab = projectSetting.headerSetting.enableCacheMultiTab;

const goToTarget = (route: RouteLocationNormalized) => {
  const { params, path, query } = route;

  return {
    params: params || {},
    path,
    query: query || {}
  }
};


export const useMultiTabStore = defineStore({
  id: 'app-multi-tab',

  state: (): MultiTabState => ({
    routeName: new Set(),

    // @ts-ignore
    routeMultiTabs: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
  }),

  getters: {
    getRouteMultiTabs(): RouteLocationNormalized[] {
      return this.routeMultiTabs;
    },

    getRouteName(): string[] {
      return Array.from(this.routeName);
    }
  },

  actions: {
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set();
      for (const tab of this.routeMultiTabs) {
        const item = getRawRoute(tab);

        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) {
          continue;
        }

        const name = item.name as string;
        cacheMap.add(name);
      }

      this.routeName = cacheMap;

      //@ts-ignore
      cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.routeMultiTabs);
    },

    clearCacheTab(): void {
      this.routeName = new Set();
    },

    resetState(): void {
      this.routeMultiTabs = [];
      this.clearCacheTab();
    },

    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;

      const findTab = this.getRouteName.find((item) => item === name);
      if (findTab) {
        this.routeName.delete(findTab);
      }

      const redo = useRedo(router);
      await redo();
    },

    async addTab(route: RouteLocationNormalized) {
      const { path, fullPath, name, params, query } = getRawRoute(route);

      if (
        path === PageEnum.BASE_LOGIN ||
        name === REDIRECT_NAME_ROUTE
      ) {
        return;
      }

      let updateIndex = -1;
      // Do not add tabs repeatedly
      const hasTabExits = this.routeMultiTabs.some((tab, index) => {
        updateIndex = index;
        return (tab.path || tab.fullPath) === (path || fullPath);
      });

      if (hasTabExits) {
        const curTab = toRaw(this.routeMultiTabs)[updateIndex];
        if (!curTab) {
          return;
        }

        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        this.routeMultiTabs.splice(updateIndex, 1, curTab);
      } else {
        this.routeMultiTabs.push(getRawRoute(route))
      }

      this.updateCacheTab();
    },

    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {}, name } = route;

        if (affix || name === DASHBOARD_NAME_ROUTE) {
          return;
        }

        const index = this.routeMultiTabs.findIndex((item) => item.fullPath === fullPath);
        index !== -1 && this.routeMultiTabs.splice(index, 1);
      };

      const { currentRoute, replace } = router;
      const { path } = unref(currentRoute);

      // Closed is not the activation tab
      if (path !== tab.path) {
        return close(tab);
      }

      // Closed is activated tab
      let toTarget: RouteLocationRaw = {};
      const index = this.routeMultiTabs.findIndex((item) => item.path === path);

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.routeMultiTabs.length === 1) {
          toTarget = PageEnum.BASE_HOME;
        } else {
          const page = this.routeMultiTabs[index + 1];
          toTarget = goToTarget(page);
        }
      } else {
        // Close the current tab
        const page = this.routeMultiTabs[index - 1];
        toTarget = goToTarget(page);
      }

      close(currentRoute.value);
      await replace(toTarget);
    },

    async closeAllTab(router: Router) {
      this.resetState();

      await router.replace({ name: DASHBOARD_NAME_ROUTE });
    },

    async closeOtherTab(route: RouteLocationNormalized) {
      const closePaths = this.routeMultiTabs.map((item) => item.fullPath);
      const paths: string[] = [];
      for (const path of closePaths) {
        if (path !== route.fullPath) {
          const closeTab = this.routeMultiTabs.find((item) => item.path === path);
          if (!closeTab) {
            continue;
          }

          const affix = closeTab.path === PageEnum.BASE_HOME;
          if (!affix) {
            paths.push(closeTab.fullPath)
          }
        }
      }

      this.closeWithTabs(paths);
      this.updateCacheTab();
    },

    async closeLeftTab(route: RouteLocationNormalized) {
      const index = this.getRouteMultiTabs.findIndex((item) => item.fullPath === route.fullPath);

      if (index > 0) {
        const leftTabs = this.routeMultiTabs.slice(0, index);
        const paths: string[] = [];
        for (const tab of leftTabs) {
          const affix = tab.path === PageEnum.BASE_HOME;
          if (!affix) {
            paths.push(tab.fullPath);
          }
        }

        this.closeWithTabs(paths);
      }

      this.updateCacheTab();
    },

    async closeRightTab(route: RouteLocationNormalized) {
      const index = this.routeMultiTabs.findIndex((item) => item.fullPath === route.fullPath);
      if (index >= 0 && index < this.routeMultiTabs.length - 1) {
        const rightTabs = this.routeMultiTabs.slice(index + 1, this.routeMultiTabs.length);

        const paths: string[] = [];
        for (const tab of rightTabs) {
          const affix = tab.path === PageEnum.BASE_HOME;
          if (!affix) {
            paths.push(tab.fullPath);
          }
        }

        this.closeWithTabs(paths);
      }

      this.updateCacheTab();
    },

    async closeWithTabs(paths: string[]) {
      this.routeMultiTabs = this.routeMultiTabs.filter((item) => !paths.includes(item.fullPath));
    }
  }
});

