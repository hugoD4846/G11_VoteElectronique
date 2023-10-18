/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from "./vuetify";
import router from "../router";
import { VueCookieNext } from "vue-cookie-next";

// Types
import type { App } from "vue";
import axios from "axios";

export function registerPlugins(app: App) {
  console.log("suuuuuu");

  app.use(vuetify).use(router).use(VueCookieNext);
  VueCookieNext.config({ expire: "10m" });
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      if (VueCookieNext.isCookieAvailable("bearer")) {
        config.headers.set(
          "Authorization",
          `Bearer ${VueCookieNext.getCookie("bearer")}`
        );
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
}
