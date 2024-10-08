<template>
    <div>
        <div class="card mb-3" @click="showModal(travel)">
            <div class="image-container">
                <img :src="getImage" :alt="travel.name" @error="handleImgError" loading="lazy" class="card-img-top">
            </div>
            <div class="card-body">
                <h4 class="card-title fw-bold">{{ travel.name }}</h4>
                <p class="address"><strong>Data di Inizio:</strong> {{ travel.start_date }}</p>
                <p class="address"><strong>Data di Fine:</strong> {{ travel.end_date }}</p>
            </div>
        </div>

        <!-- Modale -->
        <div v-if="selectedTravel" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <span class="close d-flex justify-content-end fs-2" @click="closeModal">&times;</span>
                <form @submit.prevent="submitUpdate">
                    <h2>{{ selectedTravel.name }}</h2>
                    <div class="image-container">
                        <img :src="previewImage" :alt="selectedTravel.name" @error="handleImgError" loading="lazy"
                            class="modal-img-top">
                    </div>
                    <div class="travel-input my-4">
                        <div class="details">
                            <h3>Voto del Viaggio: <span v-html="averageRatingStars"></span>
                            </h3>
                            <div class="d-flex">
                                <p><strong>Data di Inizio:</strong> {{ selectedTravel.start_date }}</p>
                                <p class="ms-3"><strong>Data di Fine</strong> {{ selectedTravel.end_date }}</p>
                            </div>
                            <div>
                                <strong>Piatti:</strong>
                                <textarea id="meal" v-model="selectedTravel.meal"
                                    class="form-control">{{ selectedTravel.meal }}</textarea>
                            </div>
                            <div class="mt-3">
                                <strong>Curiosità:</strong>
                                <textarea id="curiosity" v-model="selectedTravel.curiosity"
                                    class="form-control ">{{ selectedTravel.curiosity }}</textarea>
                            </div>
                            <div class="mt-3">
                                <strong>Descrizione:</strong>
                                <textarea id="description" v-model="selectedTravel.description"
                                    class="form-control ">{{ selectedTravel.description }}</textarea>
                            </div>
                        </div>
                        <div class="map-container">
                            <p><strong>Luogo:</strong> {{ selectedTravel.luogo }}</p>
                            <div id="map" class="map"></div>
                        </div>
                    </div>

                    <div v-for="(road, index) in selectedTravel.road" :key="index" class="road-item">
                        <div class="road-info">
                            <h3>Rotta {{ index + 1 }} : {{ road.name }}</h3>
                            <p><strong>Luogo:</strong> {{ road.via }}</p>
                            <div class="d-flex">
                                <p><strong>Data di Inizio</strong> {{ road.start_date }}</p>
                                <p class="ms-3"><strong>Data di Fine</strong> {{ road.end_date }}</p>
                            </div>
                            <div>
                                <strong>Descrizione:</strong>
                                <textarea id="road_description" v-model="road.description"
                                    class="form-control ">{{ road.description }}</textarea>
                            </div>
                            <div class="mt-3">
                                <strong>Note:</strong>
                                <textarea id="road_note" v-model="road.note"
                                    class="form-control ">{{ road.note }}</textarea>
                            </div>
                            <div class="star-rating mt-3">
                                <div>
                                    <div><strong>Valutazione Rotta:</strong></div>
                                    <small class="text-muted">Clicca per valutare</small>
                                </div>
                                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= road.rate }"
                                    @click="setRoadRating(index, star)">&#9733;</span>
                            </div>
                        </div>
                        <div class="road-image pb-4">
                            <img :src="roadImage(road.image)" :alt="road.name" @error="handleImgError" loading="lazy"
                                class="modal-img-top mb-3">
                            <div :id="`road_map_${index}`" class="map"></div>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div>
                            <small class="text-danger d-block" v-if="!isModified">Non ci sono modifiche</small>
                            <button type="submit" class="btn btn-success text-white" :disabled="!isModified">Salva
                                Modifiche</button>
                            <button type="button" class="btn btn-danger ms-2" @click="DeteleModal">Elimina</button>
                        </div>


                    </div>
                </form>
                <div v-if="dModal == 1">
                    <div class="modal" @click.self="closeDeteleModal">
                        <div class="modal-detele-content">
                            <span class="close" @click="closeDeteleModal">&times;</span>
                            <form @submit.prevent="submitDelete">
                                <h2>Conferma Eliminazione</h2>
                                <p>Sei sicuro di voler eliminare {{ selectedTravel.name }}?</p>
                                <div class="d-flex  justify-content-between">
                                    <button type="button" class="btn btn-secondary"
                                        @click="closeDeteleModal">Annulla</button>
                                    <button type="submit" class="btn btn-danger">Elimina</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div v-if="loading" class="loader-modal">
                    <LoaderComponent2 />
                </div>
            </div>
        </div>
        <div v-if="response" class="response-message" >
            <p>{{ response }} </p>
        </div>
    </div>
</template>
<script>
import { store } from "../store";
import LoaderComponent2 from "./LoaderComponent2.vue";
export default {
    name: 'CardComponent',
    props: ['travel'],
    components: {
        LoaderComponent2
    },
    data() {
        return {
            store,
            selectedTravel: null,
            previewImage: '',
            defaultImg: '/images/placeholder.png',
            dModal: null,
            map: null,
            roadMaps: [],
            loading: false,
            response: null
        };
    },
    computed: {
        getImage() {
            return this.travel.image ? `${this.store.api.imgBasePath}${this.travel.image}` : this.defaultImg;
        },
        averageRating() {
            if (this.selectedTravel && this.selectedTravel.road.length > 0) {
                const totalRating = this.selectedTravel.road.reduce((sum, road) => sum + (road.rate || 0), 0);
                return (totalRating / this.selectedTravel.road.length).toFixed(1);
            }
            return 0;
        },
        averageRatingStars() {
            const rating = parseFloat(this.averageRating);
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                const fillColor = i <= rating ? 'gold' : '#d3d3d3';
                stars += `<span style="color: ${fillColor}; font-size: 1.2em; margin-right: 2px;">&#9733;</span>`;
            }
            return stars;
        },
        isModified() {
            return JSON.stringify(this.selectedTravel) !== JSON.stringify(this.originalTravel);
        }
    },
    methods: {
        closeDeteleModal() {
            this.dModal = 0;
        },
        DeteleModal() {
            this.dModal = 1;
        },
        setRoadRating(index, rating) {
            this.selectedTravel.road[index].rate = rating;
            this.updateStarClasses(); // Aggiorna le classi delle stelle quando viene modificato il rating
        },
        showModal(travel) {
            this.selectedTravel = { ...travel, road: [...travel.road] };
            this.originalTravel = JSON.parse(JSON.stringify(this.selectedTravel));
            this.previewImage = this.getImage;

            this.$nextTick(() => {
                this.initializeMap(); // Inizializza la mappa principale
                this.initializeRoadMaps(); // Inizializza le mappe per ogni road
                this.updateStarClasses(); // Aggiorna le classi delle stelle
            });
        },
        closeModal() {
            // Ripristina il valore delle stelle e le relative classi alla chiusura della modale
            this.selectedTravel.road.forEach((road, index) => {
                road.rate = this.originalTravel.road[index].rate;
            });
            this.updateStarClasses(); // Aggiorna le classi delle stelle dopo il ripristino

            this.selectedTravel = null;
        },
        updateStarClasses() {
            this.$nextTick(() => {
                this.selectedTravel.road.forEach((road, roadIndex) => {
                    for (let i = 1; i <= 5; i++) {
                        const starElement = document.querySelector(`.road-item:nth-child(${roadIndex + 1}) .star:nth-child(${i})`);
                        if (starElement) {
                            if (i <= road.rate) {
                                starElement.classList.add('filled');
                            } else {
                                starElement.classList.remove('filled');
                            }
                        }
                    }
                });
            });
        },
        roadImage(img) {
            return img ? `${this.store.api.imgBasePath}${img}` : this.defaultImg;
        },
        handleImgError(event) {
            event.target.src = this.defaultImg;
        },
        async submitUpdate() {

            try {
                this.loading = true;
                const res = await fetch(`${this.store.api.baseUrl}travel/${this.selectedTravel.slug}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(this.selectedTravel)
                });
                const data = await res.json();
                if (res.ok) {
                    this.loading = false;
                    this.response = 'Viaggio aggiornato con successo!';
                    this.closeModal();
                    window.location.reload();
                } 
                console.log(data);
            } catch (error) {
                this.loading = false;
                this.response = 'Errore di rete o di server. Riprova tra poco!';
                console.error(error);
            }
        },
        async submitDelete() {
            try {
                this.loading = true;
                const res = await fetch(`${this.store.api.baseUrl}travel/${this.selectedTravel.slug}`, {
                    method: 'DELETE'
                });
                const data = await res.json();
                if (res.ok) {
                    this.loading = false;
                    this.response = 'Viaggio eliminato con successo!';
                    this.closeModal();
                    window.location.reload();
                }
                console.log(data);
            } catch (error) {
                this.loading = false;
                this.response = 'Errore di rete o di server. Riprova tra poco!';
                console.error(error);
            }
        },
        initializeMap() {
            if (this.selectedTravel.latitudine && this.selectedTravel.longitudine) {
                this.map = L.map("map").setView([this.selectedTravel.latitudine, this.selectedTravel.longitudine], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

                L.marker([this.selectedTravel.latitudine, this.selectedTravel.longitudine]).addTo(this.map);
            }
        },
        initializeRoadMaps() {
            this.selectedTravel.road.forEach((road, index) => {
                if (road.latitudine && road.longitudine) {
                    const mapId = `road_map_${index}`;
                    const roadMap = L.map(mapId).setView([road.latitudine, road.longitudine], 15);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(roadMap);

                    L.marker([road.latitudine, road.longitudine]).addTo(roadMap);
                    this.roadMaps.push(roadMap);
                }
            });
        }
    }
}
</script>


<style lang="scss" scoped>
.star {
    font-size: 24px;
    color: #d3d3d3;
    cursor: pointer;
    margin-right: 5px;
}

.star.filled {
    color: gold;
}

.star-rating {
    margin-bottom: 10px;
}

.image-preview {
    margin-top: 10px;
    width: 150px;
    height: 150px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-preview img {
    max-width: 100%;
    max-height: 100%;
}

.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 75%;
    max-width: 100%;
    max-height: 95%;
    overflow-y: auto;
}

.modal-detele-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 40%;
    max-width: 100%;
    max-height: 95%;
    overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
    width: 12px;
}

.modal-content::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.modal-content::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
    border: 3px solid transparent;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
}

.close {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
}

.modal-title {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
}

.modal-img-top {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.card {
    height: 350px;
    border: 0;
    border-radius: 0;
    background-color: transparent;

    &:hover {
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.3s ease-in-out;
        border-radius: 20px;
        cursor: pointer;
    }

    .image-container {
        position: relative;
        overflow: hidden;
        border-radius: 20px;

        img {
            height: 200px;
        }

        .badges {
            position: absolute;
            bottom: 8px;
            right: 12px;
            z-index: 1;

            .badge {
                background-color: blanchedalmond;
                color: black;
                font-size: 0.7rem;
                margin: 0 2px;
            }
        }
    }

    .card-img-top {
        width: 100%;
        height: 155px;
        object-fit: cover;
        transition: transform 0.3s ease-in-out;
        border-radius: 10px;


        &:hover {
            transform: scale(1.1);
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }
    }

    .card-body {
        padding: 10px;

        p {
            margin: 0;

            &.address {
                font-size: 0.8rem;
                margin-top: 5px;
            }
        }
    }
}

.details {
    flex: 1;
    padding-right: 20px;
    width: 50%;
}

.travel-input {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.map-container {
    flex-shrink: 0;
    width: 100%;
    max-width: 400px;
    height: 250px;
}

.map {
    height: 100%;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.road-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .road-info {
        flex: 1;
        padding-right: 20px;
    }

    .road-image {
        flex-shrink: 0;
        width: 350px;
        height: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }
}

.modal-buttons {
    margin-top: 20px;

    button {
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 1rem;
    }

    .btn-success {
        background-color: #28a745;
        border: none;
    }

    .btn-danger {
        background-color: #dc3545;
        border: none;
    }
}
.response-message {
  position: fixed;
  top: 50px;
  right: 10px;
  background: #ff0000;
  color: white;
  padding: 10px 10px 0px 10px;
  z-index: 3000;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 992px) {
    .travel-input {
        display: block;
    }

    .details {
        width: 100%;
    }

    .map-container {
        margin-top: 20px;
        margin-bottom: 60px;
        max-width: 100%;
    }

    .road-item {
        display: block;
        margin-bottom: 240px;

        .road-image {
            width: 100%;
            height: 250px;
        }
    }
}
@media screen and (max-width: 575px) {
    .modal-detele-content {
    width: 60%;
    }
}
</style>
