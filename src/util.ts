import { VueCookieNext } from "vue-cookie-next";
import router from "./router";
import axios from "axios";
export function canUserAccess() {
  if (!VueCookieNext.isCookieAvailable("bearer")) return false;
  const bearer = VueCookieNext.getCookie("bearer");

  if (!bearer) return false;

  return bearer;
}

export function logout() {
  VueCookieNext.removeCookie("bearer");
  router.push({ name: "Login" });
}

export async function login(vitalId: string, email: string, password: string) {
  return await axios
    .post("/auth/login", {
      vitalId,
      password,
      email,
    })
    .then(
      (response) => {
        VueCookieNext.setCookie("bearer", response.data);
        router.push({ name: "Home" });
        return false;
      },
      (error) => {
        return error.message;
      }
    );
}
