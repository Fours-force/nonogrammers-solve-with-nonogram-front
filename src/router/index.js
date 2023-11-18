import { createRouter, createWebHistory } from "vue-router";

import nonodots from "../components/nono/nonodots.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/nonodots", component: nonodots },
  ],
});

export default router;
