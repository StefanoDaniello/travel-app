import './assets/styles/main.scss'

import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'



createApp(App).use(router).mount('#app')

window.apiKey = "z3nuCqYtSq2WG00yWsSJx06bIabR9bRc";

document.addEventListener('DOMContentLoaded', () => {
    const addressInput = document.getElementById('address');
    const addressResult = document.getElementById('adreesResult');
    const resultsContainer = document.getElementById('resultsContainer');
    const apiBaseUrl = 'https://api.tomtom.com/search/2/search/';
    const apiKey = window.apiKey;
    const mapElement = document.getElementById('map');
    let map, marker;

    // Controlla se l'apiKey è impostata correttamente
    console.log('API Key:', apiKey);

    const fetchAddresses = async (query) => {
        try {
            const response = await fetch(`${apiBaseUrl}${query}.json?key=${apiKey}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching the address:', error);
            return [];
        }
    };

    const initializeMap = () => {
        map = L.map(mapElement).setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    };

    const updateMap = (lat, lon) => {
        if (marker) {
            marker.setLatLng([lat, lon]);
        } else {
            marker = L.marker([lat, lon]).addTo(map);
        }
        map.setView([lat, lon], 15);
    };

    const updateResults = (results) => {
        resultsContainer.innerHTML = '';
        if (results.length) {
            resultsContainer.style.display = 'block';
            results.forEach(({ address: { freeformAddress }, position: { lat, lon } }) => {
                const option = document.createElement('div');
                option.textContent = freeformAddress;
                option.addEventListener('click', () => {
                    addressInput.value = freeformAddress;
                    resultsContainer.style.display = 'none';
                    addressResult.style.display = 'block';
                    addressResult.innerHTML = addressInput.value;

                    // Aggiorna il v-model di Vue.js
                    const event = new CustomEvent('update-v-model', {
                        detail: { value: freeformAddress }
                    });
                    addressInput.dispatchEvent(event);

                    // Aggiorna la mappa con le coordinate
                    updateMap(lat, lon);
                });
                resultsContainer.appendChild(option);
            });
        } else {
            resultsContainer.style.display = 'none';
        }
    };

    addressInput.addEventListener('input', async () => {
        const query = addressInput.value;
        if (query.length < 5) {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }
        const results = await fetchAddresses(query);
        updateResults(results);
    });

    document.addEventListener('click', (event) => {
        if (!resultsContainer.contains(event.target) && event.target !== addressInput) {
            resultsContainer.style.display = 'none';
        }
    });

    // Inizializza la mappa quando la pagina è caricata
    initializeMap();
});
