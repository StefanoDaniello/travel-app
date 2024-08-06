<template>
    <div>
        <div class="card" @click="showModal(travel)">
            <div class="image-container">
                <img :src="getImage" :alt="travel.name" @error="handleImgError" loading="lazy" class="card-img-top">
            </div>
            <div class="card-body">
                <p class="card-title fw-bold">{{ travel.name }}</p>
                <p class="address"><strong>Start Date:</strong> {{ travel.start_date }}</p>
                <p class="address"><strong>End Date:</strong> {{ travel.end_date }}</p>
            </div>
        </div>

        <!-- Modale -->
        <div v-if="selectedTravel" class="modal" @click.self="closeModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ selectedTravel.name }}</h2>
                <div class="image-container">
                    <img :src="previewImage" :alt="selectedTravel.name" @error="handleImgError" loading="lazy" class="modal-img-top">
                </div>
                <p><strong>Description:</strong> {{ selectedTravel.description }}</p>
                <p><strong>Start Date:</strong> {{ selectedTravel.start_date }}</p>
                <p><strong>End Date:</strong> {{ selectedTravel.end_date }}</p>
                <p><strong>Meal:</strong> {{ selectedTravel.meal }}</p>
                <p><strong>Curiosity:</strong> {{ selectedTravel.curiosity }}</p>
                <div v-for="(road, index) in selectedTravel.road" :key="index" class="road-item">
                    <div class="road-info">
                        <h3>Road {{ index + 1 }} </h3>
                        <p><strong>Road Name:</strong> {{ road.name }}</p>
                        <p><strong>Road Description:</strong> {{ road.description }}</p>
                        <p><strong>Road Start Date:</strong> {{ road.start_date }}</p>
                        <p><strong>Road End Date:</strong> {{ road.end_date }}</p>
                        <p><strong>Road Rate:</strong> <span v-html="generateStars(road.rate)"></span></p>
                        <p><strong>Road Note:</strong> {{ road.note }}</p>
                    </div>
                    <div class="road-image">
                        <img :src="roadImage(road.image)" :alt="road.name" @error="handleImgError" loading="lazy" class="card-img-top">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store";
export default {
    name: 'CardComponent',
    props: ['travel'],
    data() {
        return {
            store,
            selectedTravel: null,
            previewImage: '',
            defaultImg: '/images/placeholder.png',
        };
    },
    computed: {
        getImage() {
            return this.travel.image ? `${this.store.api.imgBasePath}${this.travel.image}` : this.defaultImg;
        },
    },
    methods: {
        showModal(travel) {
            this.selectedTravel = { ...travel, road: [...travel.road] };
            this.previewImage = this.getImage;
        },
        roadImage(img) {
            return img ? `${this.store.api.imgBasePath}${img}` : this.defaultImg;
        },
        closeModal() {
            this.selectedTravel = null;
        },
        handleImgError(event) {
            event.target.src = this.defaultImg;
        },
        generateStars(rate) {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < rate ? '<span class="star filled" style="color: gold ; font-size: 1.5rem ">★</span>' : '<span class="star empty" style="color: transparent ; -webkit-text-stroke: 0.5px gold; font-size: 1.5rem;">☆</span>';
            }
            return stars;
        }
    }
}
</script>

<style lang="scss" scoped>
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

/* Add your modal styles here */
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
    width: 1000px;
    max-width: 100%;
    max-height: 95%;
    overflow-y: auto;
}
    

/* Custom scrollbar styles */
.modal-content::-webkit-scrollbar {
    width: 12px;
}

.modal-content::-webkit-scrollbar-track {
    background-color: #f5f5f5; /* Remove background of the scrollbar track */
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.modal-content::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Customize the color of the scrollbar thumb */
    border-radius: 10px;
    border: 3px solid transparent;
}

.modal-content::-webkit-scrollbar-thumb:hover {
    background-color: #aaa; /* Color when hovered */
}

.close {
    float: right;
    font-size: 1.5rem;
    cursor: pointer;
}

.modal-img-top {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
}

.card {
    border: 0;
    border-radius: 0;
    background-color: transparent;

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

        &:hover {
            transform: scale(1.1);
        }
    }

    .card-body {
        padding: 4px;

        p {
            margin: 0;

            &.address {
                font-size: 0.8rem;
                margin-top: -4px;
            }
        }
    }
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
</style>
