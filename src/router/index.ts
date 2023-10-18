// Composables
import { canUserAccess } from "@/util";
import { createRouter, createWebHistory } from "vue-router";
import Subjects from '@/views/Subjects.vue';

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: Subjects,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Auth.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== "Login") {
    try {
      const canAccess = await canUserAccess();
      if (!canAccess) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        next(); // N'oubliez pas d'appeler next() dans le cas où l'utilisateur a accès
      }
    } catch (error) {
      console.error("An error occurred while checking user access:", error);
      // Vous pouvez rediriger l'utilisateur vers une page d'erreur ou faire d'autres actions appropriées ici
    }
  } else {
    next(); // Assurez-vous d'appeler next() également pour permettre l'accès à la page de connexion
  }
});

export default router;
