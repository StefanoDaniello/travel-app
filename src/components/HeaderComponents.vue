<template>
    <header>
        <div class="d-flex justify-content-between container align-items-center">
            <router-link to="/" class="no-router">
                <h1>Travel App</h1>
            </router-link>
            <div>
                <router-link to="/" class="router-link">
                    <h6>Home</h6>
                </router-link>
                <router-link to="/travel" class="float-button" v-if="!isTravelRoute">
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
    </header>
</template>

<script>
export default {
    name: "HeaderComponents",
    data() {
        return {
        }
    },
    computed: {
        isTravelRoute() {
            return this.$route.path === '/travel';
        }
    },
};
</script>

<style lang="scss" scoped>
/* Stile per il link attivo */
.router-link {
  position: relative;
  text-decoration: none; /* Rimuove eventuali decorazioni di testo predefinite */
}

/* Linea blu sotto il link attivo */
.router-link-active:not(.no-router)::after {
  content: "";
  position: absolute;
  bottom: -5px; /* Distanza dalla parte inferiore del link */
  left: 0;
  width: 100%;
  height: 3px; /* Altezza della linea blu */
  background-color: #007bff; /* Colore blu */
  transition: all 0.3s ease; /* Transizione fluida */
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
  color: #007bff; /* Colore blu per il testo */
}

header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    z-index: 1000;
    padding-top: 30px;
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
    background:#a3a3a3d0;
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
</style>
