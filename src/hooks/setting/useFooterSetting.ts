import { computed } from 'vue';
import { FooterSetting } from '/#/config';
import { useAppStore } from '/@/store/modules/app';

export function useFooterSetting() {
  const appStore = useAppStore();

  const setFooterSetting = function (footerSetting: Partial<FooterSetting>) {
    appStore.setProjectConfig({ footerSetting });
  };

  const getEnableCopyright = computed(
    () => appStore.getFooterSetting.enableCopyright,
  );
  const getDateFooter = computed(() => appStore.getFooterSetting.date);
  const getCompanyFooter = computed(() => appStore.getFooterSetting.company);
  const getWebsiteFooter = computed(() => appStore.getFooterSetting.website);

  return {
    setFooterSetting,

    getEnableCopyright,
    getCompanyFooter,
    getDateFooter,
    getWebsiteFooter,
  };
}
