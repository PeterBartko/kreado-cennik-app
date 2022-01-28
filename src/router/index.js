import { createRouter, createWebHistory } from "vue-router";
import Grafika from "../views/Grafika.vue";
import Web from "../views/Web.vue";

const routes = [
  {
    path: "/",
    name: "Grafika",
    component: Grafika,
  },
  {
    path: "/web",
    name: "Web",
    component: Web,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;