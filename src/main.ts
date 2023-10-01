import { createApp } from "vue";

import App from "./App.vue";
import { setupStore } from "/@/store";
import { initAppConfigStore } from "/@/settings/initAppConfig";
import { globalProperties } from "/@/settings/globalProperties";
import { setupRouter } from "/@/router";
import { setupI18n } from "/@/locales/setupI18n";

async function initApplication() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Initialize internal system configuration
  initAppConfigStore();

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app);

  // Configure routing
  setupRouter(app);

  // Configuration global property
  globalProperties(app);

  // app.use(ElementPlus);
  app.mount("#app");
}

//init css
import "/@/layouts/default/assets/scss/globals.scss";
//import "element-plus/dist/index.css";

initApplication();
