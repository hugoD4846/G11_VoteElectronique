import { VueCookieNext } from "vue-cookie-next";
import router from "./router";
export function canUserAccess() {
  if (!VueCookieNext.isCookieAvailable("bearer")) return false;
  const bearer = VueCookieNext.getCookie("bearer");

  if (!bearer) return false;
  return true;
}

export function logout() {
  VueCookieNext.removeCookie("bearer");
  router.push({ name: "Login" });
}

export function login(username: string, password: string) {
  // Replace this part with your actual authentication logic
  // Simulating authentication success for the sake of example
  const dummyUsername = "admin";
  const dummyPassword = "password";

  if (username === dummyUsername && password === dummyPassword) {
    VueCookieNext.setCookie("bearer", "plop");
    router.push({ name: "Home" });
  }
}
