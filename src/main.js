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

    const updateResults = (results) => {
        resultsContainer.innerHTML = '';
        if (results.length) {
            resultsContainer.style.display = 'block';
            results.forEach(({ address: { freeformAddress } }) => {
                const option = document.createElement('div');
                option.textContent = freeformAddress;
                option.addEventListener('click', () => {
                    addressInput.value = freeformAddress;
                    resultsContainer.style.display = 'none';
                    addressResult.style.display = 'block';
                    addressResult.innerHTML = addressInput.value;
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
});
