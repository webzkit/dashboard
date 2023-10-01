import { cloneDeep, filter, get, map, sortBy } from "lodash";
import { defineStore } from "pinia";
import { RouteBaseOnEnum } from "/@/enums/appEnum";
import { useAppSetting } from "/@/hooks/setting/useAppSetting";
import { resolveRoutePath } from "/@/utils";


interface RouteState {
  isGenerate: boolean,
  routes: string[],
  currentRemoveRoutes: string[]
}

const flatAsyncRoutes = function (routes: any): any {
  if (routes.children) {
    routes.children = flatAsyncRoutesRecursive(routes.children, [{
      path: routes.path,
      title: routes.meta.title,
      hide: !routes.meta.breadcrumb && routes.meta.breadcrumb === false
    }], routes.path)
  }

  return routes;
}

const flatAsyncRoutesRecursive = function (routes: any, breadcrumb: any, baseUrl: string) {
  let res: any[] = []

  routes.forEach((route: any) => {
    if (route.children) {
      let childrenBaseUrl = resolveRoutePath(baseUrl, route.path)
      let tmpBreadcrumb = cloneDeep(breadcrumb)

      if (route.meta.breadcrumb !== false) {
        tmpBreadcrumb.push({
          path: childrenBaseUrl,
          title: route.meta.title,
          hide: !route.meta.breadcrumb && route.meta.breadcrumb === false
        })
      }

      let tmpRoute: any = cloneDeep(route)
      tmpRoute.path = childrenBaseUrl
      tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb
      delete tmpRoute.children

      res.push(tmpRoute)
      let childrenRoutes = flatAsyncRoutesRecursive(route.children, tmpBreadcrumb, childrenBaseUrl)

      childrenRoutes.map(item => {
        if (res.some(v => v.path == item.path)) {
          res.forEach((v, i) => {
            if (v.path == item.path) {
              res[i] = item
            }
          })
        } else {
          res.push(item)
        }
      })
    } else {
      let tmpRoute = cloneDeep(route)
      tmpRoute.path = resolveRoutePath(baseUrl, tmpRoute.path)
      let tmpBreadcrumb = cloneDeep(breadcrumb)

      tmpBreadcrumb.push({
        path: tmpRoute.path,
        title: tmpRoute.meta.title,
        hide: !tmpRoute.meta.breadcrumb && tmpRoute.meta.breadcrumb === false
      })

      tmpRoute.meta.breadcrumbNeste = tmpBreadcrumb

      res.push(tmpRoute)
    }
  })

  return res
}


export const useRouteStore = defineStore({
  id: 'app-route',

  state: (): RouteState => ({
    isGenerate: false,
    routes: [],
    currentRemoveRoutes: []
  }),

  getters: {
    getsIsGenerate(): boolean {
      return this.isGenerate;
    },

    getRoutes(): string[] {
      return this.routes;
    },

    getFlatRoutes: state => {
      const appSetting = useAppSetting();
      let routes = [];

      if (state.routes) {
        if (appSetting.getRouteBaseOn.value === RouteBaseOnEnum.FILE_SYSTEM) {
          return routes;
        }

        state.routes.map(item => {
          // @ts-ignore
          routes.push(...cloneDeep(item.children))

          routes.map(item => flatAsyncRoutes(item))
        })
      }

      return routes;
    }
  },

  actions: {
    generateRouteAtFrontend(asyncRoutes: any) {
      return new Promise((resolved) => {
        let accessedRoutes: any[] = []
        this.isGenerate = true;

        map(asyncRoutes, (item) => {
          accessedRoutes.push({
            children: [item],
            meta: {
              title: get(item, 'meta.title', ""),
              icon: get(item, 'meta.icon', "ep:home-filled"),
              sort: get(item, 'meta.sort', 0)
            }
          })
        });

        this.routes = sortBy(filter(cloneDeep(accessedRoutes), (o) => { return o.children.length > 0 }), 'meta.sort')

        // @ts-ignore
        resolved();
      })
    },

    generateRouteAtBackend() { },

    generateRouteFileSystem() { },

    setCurrentRemoveRoute(routes: string[]) {
      this.currentRemoveRoutes = routes
    },

    revokeRoute() {
      this.isGenerate = false;
      this.routes = [];
      this.currentRemoveRoutes.forEach(removeRoute => {
        // @ts-ignore
        removeRoute()
      })

      this.currentRemoveRoutes = []
    }
  }
})
