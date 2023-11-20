import { createRouter, createWebHistory } from "vue-router";

import nonodots from "../components/nono/nonodots.vue";
import nonobox from "../components/nono/nonobox.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/nonodots/:userId/:nonoId/:baekjoonId", component: nonodots},
    { path: "/nonobox", component: nonobox }
  ],
});

export default router;
