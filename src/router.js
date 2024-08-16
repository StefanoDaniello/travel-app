import { createRouter, createWebHistory } from "vue-router";
import Travel from "./pages/Travel.vue";
import HomePages from "./pages/HomePages.vue";
import LoginPages from "./pages/LoginPages.vue";
import RegisterPages from "./pages/RegisterPages.vue";

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
  {
    path: "/login",
    name: "Login",
    component: LoginPages,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPages,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };