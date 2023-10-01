import { watch, unref } from "vue";
import { useI18n } from '/@/hooks/web/useI18n';
import { useGlobSetting } from "/@/hooks/setting";
import { useTitle as usePageTitle } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useLocaleStore } from "/@/store/modules/locale";

/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { title } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const localeStore = useLocaleStore();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute);
      const strTitle = t(route?.meta?.title as string);
      pageTitle.value = strTitle ? `${strTitle} - ${title}` : `${title}`;
    },
    { immediate: true }
  )
}

