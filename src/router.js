import { createRouter, createWebHistory } from "vue-router";
import Travel from "./pages/Travel.vue";

const routes = [
  {
    path: "/travel",
    name: "Travel",
    component: Travel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };