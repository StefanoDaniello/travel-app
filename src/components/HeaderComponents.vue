<template>
    <header>
        <div class="d-flex justify-content-between container align-items-center">
            <router-link to="/" class="no-router">
                <h1>Travel App</h1>
            </router-link>
            <div class="d-flex align-items-center">
                <router-link to="/" class="router-link">
                    <h6>Home</h6>
                </router-link>

                <!-- Mostra Login e Registrati se userName è null -->
                <div v-if="!userName" class="d-flex">
                    <router-link class="mx-3 router-link" to="/login">
                        <h6>Accedi</h6>
                    </router-link>
                    <router-link class="router-link" to="/register">
                        <h6>Registrati</h6>
                    </router-link>
                </div>

                <div v-else>
                    <div class="d-flex align-items-center">
                        <h6 class="mx-3">Ciao, {{ userName }}!</h6>
                        <div @click="showLogoutModal" id="logout-button" title="Logout">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </div>
                    </div>

                    <!-- Pulsante per aggiungere un viaggio -->
                    <router-link to="/travel" class="float-button" >
                        <div class="wrapper">
                            <input type="checkbox" />
                            <div class="btn"></div>
                            <div class="tooltip">
                                <svg></svg>
                                <span><strong class="text-white">Aggiungi un viaggio</strong></span>
                            </div>
                            <svg></svg>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </header>

    <!-- Modale di conferma per il logout -->
    <div v-if="showModal" class="modal-overlay">
        s
        <div class="modal-content">
            <h5>Sei sicuro di voler effettuare il logout?</h5>
            <div class="modal-buttons">
                <button @click="confirmLogout" class="btn btn-danger">Logout</button>
                <button @click="closeLogoutModal" class="btn btn-secondary">Annulla</button>
            </div>
        </div>
    </div>
</template>


<script>
import { store } from "../store";
export default {
    name: "HeaderComponents",
    data() {
        return {
            store,
            showModal: false,
            userName: localStorage.getItem('user_name') || null, 
            
        };
    },
    computed: {
        isTravelRoute() {
            return this.$route.path === '/travel';
        }
    },
    watch: {
        'store.user.name': {
            immediate: true,
            handler(newValue) {
                if (newValue) {
                    this.userName = newValue;
                    localStorage.setItem('user_name', newValue);  // Aggiorna localStorage
                }
            }
        }
    },
    methods: {
        showLogoutModal() {
            this.showModal = true;
            console.log(this.showModal);
        },
        closeLogoutModal() {
            this.showModal = false;
        },
        confirmLogout() {
            this.showModal = false;
               // Elimina i dati dell'utente dallo store e dal localStorage
               this.store.user.name = null;
                this.store.user.id = null;
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                this.userName = null;  // Reset userName
                window.location.reload();
                this.$router.push('/login');
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    width: 40%;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.modal-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

#logout-button:hover {
    cursor: pointer;

    i {
        color: red;
    }
}

.no-router {
    color: black;
    text-decoration: none;
}

.router-link {
    position: relative;
    text-decoration: none;
    /* Rimuove eventuali decorazioni di testo predefinite */
}

/* Linea blu sotto il link attivo */
.router-link-active:not(.no-router)::after {
    content: "";
    position: absolute;
    bottom: -5px;
    /* Distanza dalla parte inferiore del link */
    left: 0;
    width: 100%;
    height: 3px;
    /* Altezza della linea blu */
    background-color: #007bff;
    /* Colore blu */
    transition: all 0.3s ease;
    /* Transizione fluida */
}

/* Colore del testo normale */
.router-link h6 {
    color: black;
}

/* Linea blu sparisce quando il link non è attivo */
.router-link:not(.router-link-active)::after {
    content: none;
}

/* Colore del testo quando il mouse è sopra il link non attivo */
.router-link:hover h6 {
    color: #007bff;
    /* Colore blu per il testo */
}

header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    z-index: 1000;
    padding-top: 20px;
    background-color: #e0e0e0;
}

.float-button {
    position: fixed;
    bottom: 100px;
    right: 80px;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

/* From Uiverse.io by javierBarroso */
.wrapper {
    --background: #62abff;
    --icon-color: #414856;
    --shape-color-01: #b8cbee;
    --shape-color-02: #7691e8;
    --shape-color-03: #fdd053;
    --width: 90px;
    --height: 90px;
    --border-radius: var(--height);
    width: var(--width);
    height: var(--height);
    position: relative;
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
}

.wrapper .btn {
    background: var(--background);
    width: var(--width);
    height: var(--height);
    position: relative;
    z-index: 3;
    border-radius: var(--border-radius);
    box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: plus-animation-reverse 0.5s ease-out forwards;
}

.wrapper:hover .btn {
    animation: plus-animation 0.5s ease-out forwards;
}

.wrapper .btn::before,
.wrapper .btn::after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 4px;
    background: #fff;
}

.wrapper .btn::before {
    width: 4px;
    height: 28px;
}


.wrapper .btn::after {
    width: 28px;
    height: 4px;
}

.wrapper .tooltip {
    width: fit-content;
    height: 75px;
    border-radius: 70px;
    position: absolute;
    background: #a3a3a3d0;
    z-index: 2;
    padding: 20px 35px;
    box-shadow: 0 10px 30px rgba(65, 72, 86, 0.05);
    opacity: 0;
    top: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: opacity 0.15s ease-in, top 0.15s ease-in;
}

.wrapper .tooltip>span {
    position: relative;
    width: 100%;
    white-space: nowrap;
    opacity: 0;
}

.wrapper .tooltip>svg {
    width: 100%;
    height: 26px;
    display: block;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
}

.wrapper .tooltip>svg .icon {
    fill: none;
    stroke: var(--icon-color);
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0.4;
    transition: opacity 0.3s ease;
}

.wrapper .tooltip>svg:hover .icon {
    opacity: 1;
}

.wrapper .tooltip::after {
    content: "";
    width: 20px;
    height: 20px;
    background: #a3a3a3d0;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    bottom: -8px;
    transform: rotate(45deg);
    z-index: 0;
}

.wrapper>svg {
    width: 300px;
    height: 300px;
    position: absolute;
    z-index: 1;
    transform: scale(0);
}

.wrapper>svg .shape {
    fill: none;
    stroke: none;
    stroke-width: 3px;
    stroke-linecap: round;
    stroke-linejoin: round;
    transform-origin: 50% 20%;
}

.wrapper input {
    height: 100%;
    width: 100%;
    border-radius: var(--border-radius);
    cursor: pointer;
    position: absolute;
    z-index: 5;
    opacity: 0;
}

.wrapper input:checked~svg {
    animation: pang-animation 1.2s ease-out forwards;
}

.wrapper input:checked~svg .shape:nth-of-type(1) {
    transform: translate(25px, 30%) rotate(40deg);
}

.wrapper input:checked~svg .shape:nth-of-type(2) {
    transform: translate(-4px, 30%) rotate(80deg);
}

.wrapper input:checked~svg .shape:nth-of-type(3) {
    transform: translate(12px, 30%) rotate(120deg);
}

.wrapper input:checked~svg .shape:nth-of-type(4) {
    transform: translate(8px, 30%) rotate(160deg);
}

.wrapper input:checked~svg .shape:nth-of-type(5) {
    transform: translate(21px, 30%) rotate(200deg);
}

.wrapper input:checked~svg .shape:nth-of-type(6) {
    transform: translate(0px, 30%) rotate(240deg);
}

.wrapper input:checked~svg .shape:nth-of-type(7) {
    transform: translate(17px, 30%) rotate(280deg);
}

.wrapper input:checked~svg .shape:nth-of-type(8) {
    transform: translate(-3px, 30%) rotate(320deg);
}

.wrapper input:checked~svg .shape:nth-of-type(9) {
    transform: translate(25px, 30%) rotate(360deg);
}

.wrapper input:checked~.btn {
    animation: plus-animation 0.5s ease-out forwards;
}

.wrapper:hover .tooltip {
    top: -90px;
    opacity: 1;
}

.wrapper:hover .tooltip>span {
    opacity: 1;
}

@keyframes pang-animation {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    40% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(1.1);
        opacity: 0;
    }
}

@keyframes plus-animation {
    0% {
        transform: rotate(0) scale(1);
    }

    20% {
        transform: rotate(60deg) scale(0.93);
    }

    55% {
        transform: rotate(35deg) scale(0.97);
    }

    80% {
        transform: rotate(48deg) scale(0.94);
    }

    100% {
        transform: rotate(45deg) scale(0.95);
    }
}

@keyframes plus-animation-reverse {
    0% {
        transform: rotate(45deg) scale(0.95);
    }

    20% {
        transform: rotate(-15deg);
    }

    55% {
        transform: rotate(10deg);
    }

    80% {
        transform: rotate(-3deg);
    }

    100% {
        transform: rotate(0) scale(1);
    }
}

@media screen and (max-width: 760px) {
    .float-button {
        right: 60px;
        bottom: 60px;
    }

    .wrapper .tooltip {
        height: 60px;
        /* Riduce l'altezza del tooltip */
        padding: 10px 20px;
        /* Riduce il padding interno */
    }
}

@media screen and (max-width: 575px) {
    .float-button {
        right: 30px;
        bottom: 60px;
    }

    .wrapper {
        --width: 70px;
        /* Riduce la larghezza del pulsante */
        --height: 70px;
        /* Riduce l'altezza del pulsante */
    }

    .wrapper .tooltip {
        display: none;
    }

    .wrapper .btn::before {
        height: 22px;
    }

    .wrapper .btn::after {
        width: 22px;
    }
    .modal-content {
        width: 60%;
    }

}
</style>
