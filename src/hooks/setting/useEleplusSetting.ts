import type { ElePlusSetting } from '/#/config';
import { computed } from 'vue';
import { useAppStore } from '/@/store/modules/app';

export function useElePlusSetting() {
  const appStore = useAppStore();

  const setElePlusSetting = function (elePlusSetting: Partial<ElePlusSetting>) {
    appStore.setProjectConfig({ elePlusSetting });
  };

  const getDuration = computed(() => appStore.getElePlusSetting.duration);
  const getNotificationPosition = computed(
    () => appStore.getElePlusSetting.notificatonPosition,
  );

  return {
    setElePlusSetting,
    getDuration,
    getNotificationPosition,
  };
}
