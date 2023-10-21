import type {
  ProjectConfig,
  HeaderSetting,
  MenuSetting,
  FooterSetting,
  ElePlusSetting,
} from '/#/config';
import type { BeforeMiniState } from '/#/store';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';
import { DisplayModeEnum } from '/@/enums/appEnum';

interface AppState {
  // project config
  projectConfig: ProjectConfig | null;

  // When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),

  getters: {
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },

    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },

    getFooterSetting(): FooterSetting {
      return this.getProjectConfig.footerSetting;
    },

    getElePlusSetting(): ElePlusSetting {
      return this.getProjectConfig.elePlusSetting;
    },
  },

  actions: {
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    setMode(width: number) {
      if (this.getProjectConfig.enableMobile) {
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          )
        ) {
          this.setProjectConfig({ displayMode: DisplayModeEnum.MOBILE });
        } else {
          if (width < 992) {
            this.setProjectConfig({ displayMode: DisplayModeEnum.MOBILE });
          } else {
            this.setProjectConfig({ displayMode: DisplayModeEnum.PC });
          }
        }
      } else {
        this.setProjectConfig({ displayMode: DisplayModeEnum.PC });
      }
    },

    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },

    async resetAllState() {
      Persistent.clearAll();
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
