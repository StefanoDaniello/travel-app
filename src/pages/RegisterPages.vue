<template>
    <div class="register-container">
      <h1>Registrazione</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">Nome:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="form-control"
            required
            maxlength="50"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            required
            maxlength="100"
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
            minlength="8"
            maxlength="50"
          />
        </div>
        <button class="btn btn-primary mt-2" type="submit">
          Registrati
        </button>
      </form>
      
      <div v-if="loader" class="loader-modal">
      <LoginRegisterLoad />
    </div>
    
      <!-- Messaggio di errore -->
      <div v-if="response" class="response-message" ref="responseMessage">
        <p>{{ response }}</p>
      </div>
  
      <!-- Modale di benvenuto -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Benvenuto, {{ name }}!</h2>
          <p>Verrai reindirizzato alla home tra {{ countdown }} secondi.</p>
          <button @click="redirectToHome" class="btn btn-primary">Vai alla Home</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { store } from '../store.js';
  import LoginRegisterLoad from '../components/LoginRegisterLoad.vue';
  
  export default {
    name: 'RegisterPages',
    components: {
      LoginRegisterLoad
    },
    data() {
      return {
        store,
        name: '',
        email: '',
        password: '',
        response: '',
        showModal: false,
        countdown: 15,
        loader: false
      };
    },
    methods: {
      async handleRegister() {
        try {
         this.loader = true;
          const userData = {
            name: this.name,
            email: this.email,
            password: this.password
          };
  
          const response = await fetch(`${this.store.api.baseUrl}register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
  
          if (response.ok) {
            this.loader = false;
            const result = await response.json();
            this.store.user.name = result.user.name;
            this.store.user.id = result.user.id;
            localStorage.setItem('user_name', result.user.name);
            localStorage.setItem('user_id', result.user.id);
            this.showModal = true;
            this.startCountdown();
          } else {
            this.loader = false;
            this.response = 'Errore durante la registrazione. Riprovare.';
          }
        } catch (error) {
          this.loader = false;
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
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .register-form .form-group {
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
  