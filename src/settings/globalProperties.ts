import type { App } from "vue";
import mitt from "mitt";
import hotkeys from "hotkeys-js";

export function globalProperties(app: App<Element>) {
  app.config.globalProperties.$eventBus = mitt();
  app.config.globalProperties.$hotkeys = hotkeys;
}
