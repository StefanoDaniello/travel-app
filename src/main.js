import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './assets/styles/main.scss'

// Registrazione del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}

createApp(App).use(router).mount('#app')

