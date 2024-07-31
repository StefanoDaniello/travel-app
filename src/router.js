import { createRouter, createWebHistory } from "vue-router";
import Travel from "./pages/Travel.vue";
import HomePages from "./pages/HomePages.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePages,
  },
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