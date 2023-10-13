// Composables
import { createRouter, createWebHistory } from 'vue-router';
import Subjects from '@/views/Subjects.vue';
const routes = [
  {
    path: '/home',
    component: Subjects,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
