<template>
  <div class="login-container">
    <div class="text-center">
      <h1>Accedi</h1>
    </div>
    <form @submit.prevent="handleSubmit" class="login-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control" required maxlength="100" minlength="10" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="form-control" required maxlength="50"
          minlength="8" />
      </div>
      <div class="text-center">
        <button class="btn btn-primary mt-2 text-white w-50" type="submit">
        Accedi
      </button>
      <p class="mt-3">Non hai un account? <router-link to="/register">Registrati</router-link></p>
      </div>

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
        <h2>Benvenuto, Stefano {{ store.user.name }}!</h2>
        <p>Verrai reindirizzato alla home tra {{ countdown }} secondi.</p>
        <button @click="redirectToHome" class="btn btn-primary">Vai alla Home</button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegisterLoad from '../components/LoginRegisterLoad.vue';
import { store } from '../store.js';

export default {
  name: 'LoginPages',
  components: {
    LoginRegisterLoad
  },
  data() {
    return {
      store,
      email: '',
      password: '',
      response: '',
      showModal: false,
      countdown: 15,
      loader: false
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
        this.loader = true;
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
          this.loader = false;
          const result = await response.json();
          this.store.user.name = result.user.name;
          this.store.user.id = result.user.id;

          // Salva i dati nel localStorage
          localStorage.setItem('user_name', this.store.user.name);
          localStorage.setItem('user_id', this.store.user.id);

          this.showModal = true;
          this.startCountdown();
        } else {
          this.loader = false;
          this.response = 'Login non riuscito. Controlla le tue credenziali.';

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
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 400px;
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
  width: 35%;
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
@media screen and (max-width: 577px) {
  .modal-content {
    width: 60%;
  }
  
}
</style>