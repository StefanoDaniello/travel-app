import { createRouter, createWebHistory } from "vue-router";
import Travel from "./pages/Travel.vue";
import HomePages from "./pages/HomePages.vue";
import LoginPages from "./pages/LoginPages.vue";
import RegisterPages from "./pages/RegisterPages.vue";

// Definisci le rotte
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
    meta: { requiresAuth: true }, // Richiede autenticazione
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPages,
    meta: { requiresGuest: true }, // Richiede che l'utente non sia autenticato
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPages,
    meta: { requiresGuest: true }, // Richiede che l'utente non sia autenticato
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Aggiungi un global navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user_name') || !!localStorage.getItem('user_id'); // Controlla se l'utente è autenticato
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Se la rotta richiede autenticazione e l'utente non è autenticato, reindirizza a login
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next(); // L'utente è autenticato, consenti l'accesso
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Se la rotta richiede che l'utente non sia autenticato e l'utente è autenticato, reindirizza alla home
    if (isAuthenticated) {
      next({ name: 'Home' });
    } else {
      next(); // L'utente non è autenticato, consenti l'accesso
    }
  } else {
    next(); // La rotta non richiede condizioni particolari, consenti l'accesso
  }
});

export { router };
