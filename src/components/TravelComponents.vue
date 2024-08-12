<template>
  <div class="form-container mb-5">
    <form @submit.prevent="submitForm" class="travel-form">
      <div class="mb-4">
        <h2>Crea Nuovo Viaggio</h2>
        <small>I campi con <strong class="text-danger">*</strong> sono obbligatori</small>
      </div>

      <!-- Travel Form Fields -->
      <div class="form-group">
        <label for="name">Nome Viaggio<strong class="text-danger">*</strong>:</label>
        <input type="text" id="name" v-model="form.name" class="form-control" />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group-horizontal">
        <div class="form-group">
          <label for="start_date">Data di Inizio<strong class="text-danger">*</strong>:</label>
          <input type="date" id="start_date" v-model="form.start_date" class="form-control" />
          <span v-if="errors.start_date" class="error-message">{{
            errors.start_date
          }}</span>
        </div>
        <div class="form-group">
          <label for="end_date">Data di Fine <strong class="text-danger">*</strong>: </label>
          <input type="date" id="end_date" v-model="form.end_date" class="form-control" />
          <span v-if="errors.end_date" class="error-message">{{
            errors.end_date
          }}</span>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <label for="image">Immagine viaggio:</label>
            <div>
              <input type="file" id="image" @change="handleFileUpload" class="d-none" />
              <label for="image" class="mx-2">
                <div class="Choose-img" data-tooltip="2Mb Max">
                  <div class="button-wrapper-Choose-img">
                    <div class="text">Scegli Immagine</div>
                    <span class="icon-img-Choose-img">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em"
                        preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17">
                        </path>
                      </svg>
                    </span>
                  </div>
                </div>
              </label>
              <div class="image-preview mt-3" v-if="previewImage">
                <img :src="previewImage || store.api.defaultImg" @error="setDefaultImg" alt="Image preview" />
              </div>
              <div v-else class="image-preview mt-3">
                <img :src="store.api.defaultImg" alt="Default image preview" />
              </div>
            </div>
            <span v-if="errors.image" class="error-message">{{
              errors.image
            }}</span>
          </div>

          <div class="col-6">
            <!-- <input type="text" id="luogo" class="form-control"> -->

            <label for="luogo">Luogo<strong class="text-danger">*</strong>:</label>
            <input class="mb-3 form-control" type="text" id="address" name="address" v-model="form.luogo"
              @input="handleInput" maxlength="255" placeholder="Inserisci il luogo" />
            <div id="resultsContainer" class="results-container"></div>
            <div id="map"></div>
            <span v-if="errors.luogo" class="error-message">{{
              errors.luogo
            }}</span>

          </div>
        </div>
      </div>

      <div class="form-group mt-3">
        <label for="description">Descrizione:</label>
        <textarea id="description" v-model="form.description" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label for="meal">Piatti:</label>
        <textarea id="meal" v-model="form.meal" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label for="curiosity">Curiosità:</label>
        <textarea id="curiosity" v-model="form.curiosity" class="form-control"></textarea>
      </div>

      <!-- Roads Section -->
      <div v-for="(road, index) in form.roads" :key="index" class="road-group">
        <div class="d-flex align-items-center mb-3">
          <button class="trash-button" v-if="index + 1 > 1" type="button" @click="openDeleteModal(index)"
            title="Elimina">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 14" class="trash-svgIcon trash-bin-top">
              <g clip-path="url(#clip0_35_24)">
                <path fill="black"
                  d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z">
                </path>
              </g>
              <defs>
                <clipPath id="clip0_35_24">
                  <rect fill="white" height="14" width="69"></rect>
                </clipPath>
              </defs>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 69 57" class="trash-svgIcon bin-bottom">
              <g clip-path="url(#clip0_35_22)">
                <path fill="black"
                  d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z">
                </path>
              </g>
              <defs>
                <clipPath id="clip0_35_22">
                  <rect fill="white" height="57" width="69"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>

          <h3 class="mx-2 mt-2">Rotta {{ index + 1 }}</h3>
        </div>

        <div class="form-group">
          <label :for="'road_name_' + index">Nome<strong class="text-danger">*</strong>:</label>
          <input type="text" :id="'road_name_' + index" v-model="road.name" class="form-control" />
          <span v-if="errors[`road_${index}_name`]" class="error-message">{{
            errors[`road_${index}_name`]
          }}</span>
        </div>

        <div class="form-group-horizontal">
          <div class="form-group">
            <label :for="'road_start_date_' + index">Data di Inizio<strong class="text-danger">*</strong>:</label>
            <input type="date" :id="'road_start_date_' + index" v-model="road.start_date" class="form-control" />
            <span v-if="errors[`road_${index}_start_date`]" class="error-message">{{ errors[`road_${index}_start_date`]
              }}</span>
          </div>
          <div class="form-group">
            <label :for="'road_end_date_' + index">Data di Fine<strong class="text-danger">*</strong>:</label>
            <input type="date" :id="'road_end_date_' + index" v-model="road.end_date" class="form-control" />
            <span v-if="errors[`road_${index}_end_date`]" class="error-message">{{ errors[`road_${index}_end_date`]
              }}</span>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-6">
              <label :for="'road_image_' + index">Immagine Rotta:</label>
              <div>
                <input type="file" :id="'road_image_' + index" @change="(event) => handleRoadFileUpload(event, index)"
                  class="d-none" />
                <div>
                  <label :for="'road_image_' + index" class="mx-2">
                    <div class="Choose-img" data-tooltip="2Mb Max">
                      <div class="button-wrapper-Choose-img">
                        <div class="text">Scegli Immagine</div>
                        <span class="icon-img-Choose-img">
                          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em"
                            preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17">
                            </path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </label>
                  <div class="image-preview" v-if="road.previewImage">
                    <img :src="road.previewImage || store.api.defaultImg" @error="setDefaultRoadImg"
                      alt="Road image preview" />
                  </div>
                  <div v-else class="image-preview">
                    <img :src="store.api.defaultImg" alt="Default image preview" />
                  </div>
                </div>
              </div>
              <span v-if="errors[`road_${index}_image`]" class="error-message">{{ errors[`road_${index}_image`]
                }}</span>
            </div>

            <div class="col-6">
              <div>
                <label for="via">Luogo<strong class="text-danger">*</strong>:</label>
                <input type="text" :id="'road_via_' + index" v-model="road.via" @input="handleRoadInput(index)"
                  class="form-control mb-2" placeholder="Inserisci il luogo"/>
                <div :id="'road_resultsContainer_' + index" class="results-container"></div>
                <div :id="'road_map_' + index" class="road-map"></div>
              </div>
              <span v-if="errors[`road_${index}_via`]" class="error-message">{{ errors[`road_${index}_via`]
                }}</span>
            </div>


          </div>
        </div>

        <div class="form-group mt-3">
          <label :for="'road_description_' + index">Descrizione:</label>
          <textarea :id="'road_description_' + index" v-model="road.description" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label :for="'road_note_' + index">Note:</label>
          <textarea :id="'road_note_' + index" v-model="road.note" class="form-control"></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="form-group d-flex justify-content-between">
        <button type="button" class="add-road" @click="addRoad">
          Add Road
        </button>
        <div>
          <button class="send-button" type="submit">
            <div class="send-svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path fill="currentColor"
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z">
                </path>
              </svg>
            </div>
            <span>Crea Viaggio</span>
          </button>
        </div>
      </div>
    </form>

    <div v-if="showDeleteModal" class="delete-modal">
      <div class="modal-content">
        <h5 class="my-3">Vuoi davvero cancellare questa rotta?</h5>
        <div class="d-flex justify-content-center">
          <button class="btn btn-danger mx-1" @click="deleteRoad">
            Elimina
          </button>
          <button class="btn btn-secondary mx-1" @click="closeDeleteModal">
            Annulla
          </button>
        </div>
      </div>
    </div>

    <div v-if="loader" class="loader-modal"	>
      <LoaderComponent/>
    </div>


    <div v-if="response" class="response-message" ref="responseMessage">
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import LoaderComponent from "./LoaderComponent.vue";
export default {
  name: "TravelComponent",
  components: {
    LoaderComponent
  },
  data() {
    return {
      loader: false,
      maps: [],
      markers: [],
      map: null,
      marker: null,
      results: [],
      store,
      form: {
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        meal: "",
        curiosity: "",
        luogo: "",
        latitudine: 0,
        longitudine: 0,
        roads: [
          {
            name: "",
            description: "",
            start_date: "",
            end_date: "",
            rate: 0,
            note: "",
            via: "",
            latitudine: 0,
            longitudine: 0,
            previewImage: "",
            imageFile: null,
          },
        ],
      },
      imageFile: null,
      previewImage: "",
      response: null,
      errors: {},
      showDeleteModal: false,
      roadToDeleteIndex: null,
    };
  },
  mounted() {
    this.initializeMap();
    this.form.roads.forEach((_, index) => {
      this.initializeRoadMap(index); // Inizializza la mappa per ogni road esistente
    });
  },

  methods: {

    initializeMap() {
      this.map = L.map("map").setView([0, 0], 2); // Inizializza la mappa centrata su [0, 0]
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    updateMap(lat, lon) {
      if (this.marker) {
        this.marker.setLatLng([lat, lon]); // Aggiorna la posizione del marker
      } else {
        this.marker = L.marker([lat, lon]).addTo(this.map); // Crea un nuovo marker se non esiste
      }
      this.map.setView([lat, lon], 15); // Centra la mappa sulle nuove coordinate
    },
    async fetchAddresses(query) {
      const apiBaseUrl = "https://api.tomtom.com/search/2/search/";
      const apiKey = "z3nuCqYtSq2WG00yWsSJx06bIabR9bRc"; // La tua API key
      try {
        const response = await fetch(
          `${apiBaseUrl}${query}.json?key=${apiKey}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error("Error fetching the address:", error);
        return [];
      }
    },
    async handleInput() {
      const query = this.form.luogo;
      if (query.length < 5) return;

      this.results = await this.fetchAddresses(query);
      this.displayResults();
    },
    displayResults() {
      const resultsContainer = document.getElementById("resultsContainer");
      resultsContainer.innerHTML = "";

      this.results.forEach(
        ({ address: { freeformAddress }, position: { lat, lon } }) => {
          const option = document.createElement("div");
          option.textContent = freeformAddress;
          option.addEventListener("click", () => {
            this.form.luogo = freeformAddress; // Aggiorna il v-model
            this.updateMap(lat, lon); // Aggiorna la mappa con le coordinate selezionate
            this.form.latitudine = lat; // Salva la latitudine
            this.form.longitudine = lon; // Salva la longitudine
            resultsContainer.innerHTML = ""; // Nascondi i risultati dopo la selezione
          });
          resultsContainer.appendChild(option);
        }
      );
    },
    // Altre funzioni esistenti...
    normalizeDate(dateString) {
      const date = new Date(dateString);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
      if (this.imageFile) {
        this.previewImage = URL.createObjectURL(this.imageFile);
      }
    },
    handleRoadFileUpload(event, index) {
      const file = event.target.files[0];
      if (file) {
        this.form.roads[index].previewImage = URL.createObjectURL(file);
        this.form.roads[index].imageFile = file;
      }
    },
    setDefaultImg(event) {
      event.target.src = this.store.api.defaultImg;
    },
    setDefaultRoadImg(event) {
      event.target.src = this.store.api.defaultImg;
    },


    initializeRoadMap(index) {
      // Inizializza la mappa per una road specifica
      const mapId = `road_map_${index}`;
      const map = L.map(mapId).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      this.maps[index] = map;
    },
    updateRoadMap(lat, lon, index) {
      // Aggiorna la posizione del marker e centra la mappa per una road specifica
      if (this.markers[index]) {
        this.markers[index].setLatLng([lat, lon]);
      } else {
        this.markers[index] = L.marker([lat, lon]).addTo(this.maps[index]);
      }
      this.maps[index].setView([lat, lon], 15);
    },
    async handleRoadInput(index) {
      // Gestisci l'input per il campo via e aggiorna i risultati e la mappa
      const query = this.form.roads[index].via;
      if (query.length < 5) return;

      this.results = await this.fetchAddresses(query);
      this.displayRoadResults(index);
    },
    displayRoadResults(index) {
      const resultsContainer = document.getElementById(`road_resultsContainer_${index}`);
      resultsContainer.innerHTML = '';

      this.results.forEach(({ address: { freeformAddress }, position: { lat, lon } }) => {
        const option = document.createElement('div');
        option.textContent = freeformAddress;
        option.addEventListener('click', () => {
          this.form.roads[index].via = freeformAddress; // Aggiorna il v-model
          this.updateRoadMap(lat, lon, index); // Aggiorna la mappa con le coordinate selezionate
          this.form.roads[index].latitudine = lat; // Salva la latitudine
          this.form.roads[index].longitudine = lon; // Salva la longitudine
          resultsContainer.innerHTML = ''; // Nascondi i risultati dopo la selezione
        });
        resultsContainer.appendChild(option);
      });
    },
    addRoad() {
      this.form.roads.push({
        name: "",
        description: "",
        start_date: "",
        end_date: "",
        rate: 0,
        note: "",
        via: "",
        latitudine: 0,
        longitudine: 0,
        previewImage: "",
        imageFile: null,
      });
      this.$nextTick(() => {
        const newIndex = this.form.roads.length - 1;
        this.initializeRoadMap(newIndex); // Inizializza la mappa per la nuova road
      });
      console.log(this.form.luogo);
    },
    setRoadRating(index, rating) {
      this.form.roads[index].rate = rating;
    },
    openDeleteModal(index) {
      this.roadToDeleteIndex = index;
      this.showDeleteModal = true;
    },
    closeDeleteModal() {
      this.roadToDeleteIndex = null;
      this.showDeleteModal = false;
    },
    deleteRoad() {
      if (this.roadToDeleteIndex !== null) {
        this.form.roads.splice(this.roadToDeleteIndex, 1);
        this.closeDeleteModal();
      }
    },
    validateForm() {
      let isValid = true;
      this.errors = {};
      console.log(this.errors);

      // Normalize travel dates
      const travelStartDate = this.normalizeDate(this.form.start_date);
      const travelEndDate = this.normalizeDate(this.form.end_date);

      // Validate Travel
      if (!this.form.name) {
        this.errors.name = "Il nome è obbligatorio.";
        isValid = false;
      }
      if (!this.form.start_date) {
        this.errors.start_date = "La data di partenza è obbligatoria.";
        isValid = false;
      } else if (travelStartDate < this.normalizeDate(new Date())) {
        this.errors.start_date = "La data di partenza non può essere nel passato.";
        isValid = false;
      }
      if (!this.form.end_date) {
        this.errors.end_date = "La data di fine è obbligatoria.";
        isValid = false;
      } else if (travelStartDate && travelEndDate < travelStartDate) {
        this.errors.end_date = "La data di arrivo deve essere dopo la data di partenza.";
        isValid = false;
      }
      // if (this.form.imageFile != ".png" && this.form.imageFile != ".jpg" && this.form.imageFile != ".jpeg" && this.form.imageFile != ".gif") {
      //   this.errors.image = "Image must be a .png, .jpg, .jpeg or .gif file.";
      //   isValid = false;
      // }
      if (this.form.imageFile > 2048 * 1024) {
        this.errors.image = "L'immagine deve essere inferiore a 2MB.";
        isValid = false;
      }
      if (!this.form.luogo) {
        this.errors.luogo = "Il luogo del viaggio è obbligatorio.";
        isValid = false;
      }

      // Validate Roads
      const roadErrors = this.validateRoads(travelStartDate, travelEndDate);
      if (Object.keys(roadErrors).length > 0) {
        isValid = false;
      }
      this.errors = { ...this.errors, ...roadErrors };

      return isValid;
    },
    validateRoads(travelStartDate, travelEndDate) {
      let roadErrors = {};

      this.form.roads.forEach((road, index) => {
        const roadStartDate = this.normalizeDate(road.start_date);
        const roadEndDate = this.normalizeDate(road.end_date);

        if (!road.name) {
          roadErrors[`road_${index}_name`] = "Il nome è obbligatorio.";
        }
        if (!road.start_date) {
          roadErrors[`road_${index}_start_date`] =
            "La data di partenza è obbligatoria.";
        } else if (roadStartDate < travelStartDate) {
          roadErrors[`road_${index}_start_date`] =
            "La data di partenza deve essere dopo la data di partenza del viaggio.";
        } else if (roadStartDate > travelEndDate) {
          roadErrors[`road_${index}_start_date`] =
            "La data di partenza deve essere prima della data di fine del viaggio.";
        }
        if (!road.end_date) {
          roadErrors[`road_${index}_end_date`] = "La data di fine è obbligatoria.";
        } else if (roadEndDate < roadStartDate) {
          roadErrors[`road_${index}_end_date`] =
            "La data di fine deve essere dopo la data di partenza.";
        } else if (roadEndDate > travelEndDate) {
          roadErrors[`road_${index}_end_date`] =
            "La data di fine deve essere prima della data di fine del viaggio.";
        }
        if (road.imageFile > 2048 * 1024) {
          roadErrors[`road_${index}_imageFile`] =
            "L'immagine deve essere inferiore a 2MB.";
        }
        // if (road.imageFile != ".jpeg" && road.imageFile != ".png" && road.imageFile != ".jpg" && road.imageFile != ".webp") {
        //   roadErrors[`road_${index}_imageFile`] = "File type must be .jpeg, .png, .jpg, or .webp.";
        // }
        if (!road.via) {
          roadErrors[`road_${index}_via`] = "Il luogo della rotta è obbligatorio.";
        }
      });

      return roadErrors;
    },
    scrollToFirstError() {
      this.$nextTick(() => {
        const firstErrorElement = this.$el.querySelector(".error-message");
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      });
    },
    async submitForm() {
      if (!this.validateForm()) {
        this.scrollToFirstError();
        return;
      }

      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("description", this.form.description);
      formData.append("start_date", this.form.start_date);
      formData.append("end_date", this.form.end_date);
      formData.append("meal", this.form.meal);
      formData.append("curiosity", this.form.curiosity);
      formData.append("luogo", this.form.luogo);
      formData.append("latitudine", this.form.latitudine);
      formData.append("longitudine", this.form.longitudine);
      if (this.imageFile) {
        formData.append("image", this.imageFile);
      }

      this.form.roads.forEach((road, index) => {
        formData.append(`roads[${index}][name]`, road.name);
        formData.append(`roads[${index}][description]`, road.description);
        formData.append(`roads[${index}][start_date]`, road.start_date);
        formData.append(`roads[${index}][end_date]`, road.end_date);
        formData.append(`roads[${index}][rate]`, road.rate);
        formData.append(`roads[${index}][note]`, road.note);
        formData.append(`roads[${index}][via]`, road.via);
        formData.append(`roads[${index}][latitudine]`, road.latitudine);
        formData.append(`roads[${index}][longitudine]`, road.longitudine);
        if (road.imageFile) {
          formData.append(`roads[${index}][image]`, road.imageFile);
        }
      });

      try {
        this.loader = true;
        const res = await fetch(this.store.api.baseUrl + "travel", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          this.loader = false;
          this.response = "Travel added successfully!";
          this.$router
            .push("/")
            .then(() => {
              window.location.reload(); // Forza il refresh della pagina
            })
            .catch((err) => console.error("Error while redirecting:", err));
        } else {
          this.response = "Error adding travel!";
        }
        console.log(data);
      } catch (error) {
        this.response = "Error adding travel!";
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// Road-button 
.add-road{
  padding: 17px 40px;
  border-radius: 50px;
  cursor: pointer;
  border: 0;
  color: white;
  background-color: #94eb31;
  box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;
}

.add-road:hover {
  letter-spacing: 3px;
  background-color: rgb(107, 214, 36);
  color: hsl(0, 0%, 100%);
  box-shadow: rgb(110, 214, 41) 0px 7px 29px 0px;
}

// Choose-Button-img
.Choose-img {
  --width: 100%;
  --height: 50px;
  --tooltip-height: 35px;
  --tooltip-width: 90px;
  --gap-between-tooltip-to-button: 18px;
  --button-color: #1163ff;
  --tooltip-color: #c9c9c9ce;
  width: var(--width);
  height: var(--height);
  background: var(--button-color);
  position: relative;
  text-align: center;
  border-radius: 0.45em;
  font-family: "Arial";
  transition: background 0.3s;
}

.Choose-img::before {
  position: absolute;
  content: attr(data-tooltip);
  width: var(--tooltip-width);
  height: var(--tooltip-height);
  background-color: var(--tooltip-color);
  font-size: 0.9rem;
  color: #111;
  border-radius: .25em;
  line-height: var(--tooltip-height);
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) + 10px);
  left: calc(50% - var(--tooltip-width) / 2);
}

.Choose-img::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: var(--tooltip-color);
  left: calc(50% - 10px);
  bottom: calc(100% + var(--gap-between-tooltip-to-button) - 10px);
}

.Choose-img::after,
.Choose-img::before {
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-wrapper-Choose-img,
.text,
.icon-img-Choose-img {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  color: #fff;
}

.text {
  top: 0;
}

.text,
.icon-img-Choose-img {
  transition: top 0.5s;
}

.icon-img-Choose-img {
  color: #fff;
  top: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img-Choose-img svg {
  width: 24px;
  height: 24px;
}

/* Stili per l'interazione con il pulsante */
.Choose-img:hover {
  background: #0149cf;
}

.Choose-img:hover .text {
  top: -100%;
}

.Choose-img:hover .icon-img-Choose-img {
  top: 0;
}

.Choose-img:hover::before,
.Choose-img:hover::after {
  opacity: 1;
  visibility: visible;
}

.Choose-img:hover::after {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button) - 20px);
}

.Choose-img:hover::before {
  bottom: calc(var(--height) + var(--gap-between-tooltip-to-button));
}

// Send Button 
.send-button {
  font-family: inherit;
  font-size: 18px;
  background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
  color: white;
  padding: 0.8em 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

.send-button:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

.send-button:active {
  transform: scale(0.95);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.send-button span {
  display: block;
  margin-left: 0.4em;
  transition: all 0.3s;
}

/* Stili per l'icona SVG */
.send-svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 0.5em;
  transition: all 0.3s;
}

.send-button:hover .send-svg-wrapper {
  background-color: rgba(255, 255, 255, 0.5);
}

.send-button svg {
  width: 18px;
  height: 18px;
  fill: white;
  transition: all 0.3s;
}

.send-button:hover svg {
  transform: rotate(45deg);
}

// Deleat button
.trash-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: relative;
  gap: 2px;
}

.trash-svgIcon {
  width: 12px;
  transition-duration: 0.3s;
}

.trash-svgIcon path {
  fill: white;
}

.trash-button:hover {
  transition-duration: 0.3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
  gap: 0;
}

.trash-bin-top {
  transform-origin: bottom right;
}

.trash-button:hover .trash-bin-top {
  transition-duration: 0.5s;
  transform: rotate(160deg);
}

// Mappe

.road-map {
  width: 100%;
  height: 350px;
  z-index: 0;
}

#map {
  width: 100%;
  height: 350px;
  z-index: 0;
}

.results-container {
  position: absolute;
  z-index: 100;
  background-color: white;
  width: 360px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}


.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  max-width: 500px;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
}

.image-preview {
  margin-top: 10px;
  height: 350px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
}

.form-container {
  width: 800px; // Increased width
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.travel-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group-horizontal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group-horizontal .form-group {
  width: 48%;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input[type="text"],
textarea,
input[type="date"],
input[type="file"] {
  width: 100%;
  padding: 12px; // Increased padding
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

textarea {
  height: 100px; // Increased height for better readability
  resize: vertical; // Allow vertical resizing
}

.star-rating {
  display: flex;
  margin-bottom: 15px;
}

.star {
  font-size: 24px; // Increased star size
  color: #d3d3d3; // Light grey for empty stars
  cursor: pointer;
  margin-right: 5px;
}

.star.filled {
  color: gold; // Gold color for filled stars
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 12px 20px; // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-success {
  background-color: #28a745;
  color: white;
  padding: 12px 20px; // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  padding: 12px 20px; // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  padding: 12px 20px; // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.response-message {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #007bff;
  color: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .form-container {
    width: 100%;
    padding: 10px;
  }

  .form-group-horizontal {
    flex-direction: column;
  }

  .form-group-horizontal .form-group {
    width: 100%;
  }

  .btn-primary,
  .btn-success,
  .btn-danger,
  .btn-secondary {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
