import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "TagstextAreaComponent",

    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/tags-main-view/tags-main.view.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
