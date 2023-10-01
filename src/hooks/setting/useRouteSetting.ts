import { computed } from "vue";
import { useRouteStore } from "/@/store/modules/route";


export function useRouteSetting() {
  const routeStore = useRouteStore();

  const getIsGenerate = computed(() => routeStore.getsIsGenerate);
  const getRoutes = computed(() => routeStore.getRoutes);

  return {
    routeStore,

    getRoutes,
    getIsGenerate
  }
}

