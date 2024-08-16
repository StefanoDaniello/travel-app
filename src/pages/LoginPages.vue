<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            required
            maxlength="100"
            minlength="10"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            required
            maxlength="50"
            minlength="8"
          />
        </div>
        <button class="btn btn-success mt-2" type="submit">
          Login
        </button>
      </form>
  
      <!-- Messaggio di errore -->
      <div v-if="response" class="response-message" ref="responseMessage">
        <p>{{ response }}</p>
      </div>
  
      <!-- Modale di benvenuto -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Benvenuto, {{ store.user.name }}!</h2>
          <p>Verrai reindirizzato alla home tra {{ countdown }} secondi.</p>
          <button @click="redirectToHome" class="btn btn-primary">Vai alla Home</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { store } from '../store.js';
  
  export default {
    name: 'LoginPages',
    data() {
      return {
        store,
        email: '',
        password: '',
        response: '',
        showModal: false,
        countdown: 15,
      };
    },
    created() {
      // Recupera i dati dal localStorage all'avvio del componente
      const storedName = localStorage.getItem('user_name');
      const storedId = localStorage.getItem('user_id');
  
      if (storedName && storedId) {
        this.store.user.name = storedName;
        this.store.user.id = storedId;
      }
    },
    methods: {
      async handleSubmit() {
        try {
          const userData = {
            email: this.email,
            password: this.password,
          };
          const response = await fetch(`${this.store.api.baseUrl}login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
  
          if (response.ok) {
            const result = await response.json();
            this.store.user.name = result.user.name;
            this.store.user.id = result.user.id;
  
            // Salva i dati nel localStorage
            localStorage.setItem('user_name', this.store.user.name);
            localStorage.setItem('user_id', this.store.user.id);
  
            this.showModal = true;
            this.startCountdown();
          } else {
            this.response = 'Errore durante il login. Controlla la tua password e la tua email e riprova.';
          }
        } catch (error) {
          this.response = 'Errore di rete o di server. Riprova tra poco!';
        }
      },
      startCountdown() {
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(interval);
            this.redirectToHome();
          }
        }, 1000);
      },
      redirectToHome() {
        this.$router.push('/');
      },
      logout() {
        // Cancella i dati dallo store e dal localStorage
        this.store.user.name = null;
        this.store.user.id = null;
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .login-form .form-group {
    margin-bottom: 15px;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
  }
  
  .response-message {
    margin-top: 20px;
    color: red;
    text-align: center;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 50%;
    text-align: center;
  }
  
  .modal-content h2 {
    margin-bottom: 10px;
  }
  
  .modal-content p {
    margin-bottom: 20px;
  }
  
  .modal-content .btn {
    background-color: #007bff;
    color: white;
  }
  </style>
  