<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="travel-form">
      <!-- Travel Form Fields -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" />
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>

      <div class="form-group-horizontal">
        <div class="form-group">
          <label for="start_date">Start Date:</label>
          <input type="date" id="start_date" v-model="form.start_date" />
          <span v-if="errors.start_date" class="error-message">{{
            errors.start_date
          }}</span>
        </div>
        <div class="form-group">
          <label for="end_date">End Date:</label>
          <input type="date" id="end_date" v-model="form.end_date" />
          <span v-if="errors.end_date" class="error-message">{{
            errors.end_date
          }}</span>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-6">
            <label for="image">Image:</label>
            <div>
              <input type="file" id="image" @change="handleFileUpload" class="d-none" />
              <label for="image" class="btn btn-primary ms-2">Choose Image</label>
              <div class="image-preview" v-if="previewImage">
                <img :src="previewImage || store.api.defaultImg" @error="setDefaultImg" alt="Image preview" />
              </div>
              <div v-else class="image-preview">
                <img :src="store.api.defaultImg" alt="Default image preview" />
              </div>

            </div>
            <span v-if="errors.image" class="error-message">{{ errors.image }}</span>
          </div>

          <div class="col-6	">
            <label for="luogo">Luogo:</label>
            <!-- <input type="text" id="luogo" class="form-control"> -->
            <div class="address d-flex justify-content-center flex-column">
              <div class="d-flex mt-3 align-content-center">
                <input class="" type="text" id="address" name="address" v-model="form.luogo" required maxlength="255"
                  minlength="7">
                <button id="edit-btn" class="btn-2 ms-3 draw-border-2 mt-3"><i
                    class="fa-solid fs-4 fa-pencil"></i></button>
              </div>
              <div id="adreesResult"></div>
              <label for="address">*required</label>
              <div id="resultsContainer" class="results-container"></div>
            </div>
            <!-- <div id="map" style="width: 100%; height: 400px;"></div> -->
          </div>

        </div>
      </div>


      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>

      <div class="form-group">
        <label for="meal">Meal:</label>
        <textarea id="meal" v-model="form.meal"></textarea>
      </div>

      <div class="form-group">
        <label for="curiosity">Curiosity:</label>
        <textarea id="curiosity" v-model="form.curiosity"></textarea>
      </div>



      <!-- Roads Section -->
      <div v-for="(road, index) in form.roads" :key="index" class="road-group">
        <div class="d-flex align-items-center mb-3">
          <button v-if="index + 1 > 1" type="button" class="btn btn-danger" @click="openDeleteModal(index)">
            x
          </button>
          <h3 class="mx-2">Road {{ index + 1 }}</h3>
        </div>

        <div class="form-group">
          <label :for="'road_name_' + index">Road Name:</label>
          <input type="text" :id="'road_name_' + index" v-model="road.name" />
          <span v-if="errors[`road_${index}_name`]" class="error-message">{{
            errors[`road_${index}_name`]
          }}</span>
        </div>

        <div class="form-group-horizontal">
          <div class="form-group">
            <label :for="'road_start_date_' + index">Road Start Date:</label>
            <input type="date" :id="'road_start_date_' + index" v-model="road.start_date" />
            <span v-if="errors[`road_${index}_start_date`]" class="error-message">{{ errors[`road_${index}_start_date`]
              }}</span>
          </div>
          <div class="form-group">
            <label :for="'road_end_date_' + index">Road End Date:</label>
            <input type="date" :id="'road_end_date_' + index" v-model="road.end_date" />
            <span v-if="errors[`road_${index}_end_date`]" class="error-message">{{ errors[`road_${index}_end_date`]
              }}</span>
          </div>
        </div>


        <div class="container">
          <div class="row">

            <div class="col-6">
              <label :for="'road_image_' + index">Road Image:</label>
              <div>
                <input type="file" :id="'road_image_' + index" @change="(event) => handleRoadFileUpload(event, index)"
                  class="d-none" />
                <div>
                  <label :for="'road_image_' + index" class="btn btn-primary ms-2">Choose Image</label>
                  <div class="image-preview" v-if="road.previewImage">
                    <img :src="road.previewImage || store.api.defaultImg" @error="setDefaultRoadImg"
                      alt="Road image preview" />
                  </div>
                  <div v-else class="image-preview">
                    <img :src="store.api.defaultImg" alt="Default image preview" />
                  </div>
                </div>
              </div>
              <span v-if="errors[`road_${index}_image`]" class="error-message">{{
                errors[`road_${index}_image`]
              }}</span>
            </div>

            <div class="col-6">
              <label for="via">via:</label>
              <input type="text" :id="'road_via_' + index" v-model="road.via" class="form-control">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label :for="'road_description_' + index">Road Description:</label>
          <textarea :id="'road_description_' + index" v-model="road.description"></textarea>
        </div>

        <div class="form-group">
          <label :for="'road_rate_' + index">Road Rate:</label>
          <div class="star-rating">
            <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= road.rate }"
              @click="setRoadRating(index, star)">&#9733;</span>
          </div>
        </div>

        <div class="form-group">
          <label :for="'road_note_' + index">Road Note:</label>
          <textarea :id="'road_note_' + index" v-model="road.note"></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="form-group d-flex justify-content-between">
        <button type="button" class="btn btn-primary" @click="addRoad">
          Add Road
        </button>
        <button type="submit" class="btn btn-success">Add Travel</button>
      </div>
    </form>

    <div v-if="showDeleteModal" class="delete-modal">
      <div class="modal-content">
        <p>Vuoi davvero cancellare questa rotta?</p>
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

    <div v-if="response" class="response-message" ref="responseMessage">
      <p>{{ response }}</p>
    </div>
  </div>
</template>



<script>
import { store } from "../store";
export default {
  name: "TravelComponent",
  data() {
    return {
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
    const addressInput = document.getElementById('address');
    addressInput.addEventListener('update-v-model', (event) => {
      this.form.luogo = event.detail.value;
    });
  },
  methods: {
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

      // Normalize travel dates
      const travelStartDate = this.normalizeDate(this.form.start_date);
      const travelEndDate = this.normalizeDate(this.form.end_date);

      // Validate Travel
      if (!this.form.name) {
        this.errors.name = "Name is required.";
        isValid = false;
      }
      if (!this.form.start_date) {
        this.errors.start_date = "Start Date is required.";
        isValid = false;
      } else if (travelStartDate < this.normalizeDate(new Date())) {
        this.errors.start_date = "Start Date cannot be in the past.";
        isValid = false;
      }
      if (!this.form.end_date) {
        this.errors.end_date = "End Date is required.";
        isValid = false;
      } else if (travelStartDate && travelEndDate < travelStartDate) {
        this.errors.end_date = "End Date must be after Start Date.";
        isValid = false;
      }
      // if (this.form.imageFile != ".png" && this.form.imageFile != ".jpg" && this.form.imageFile != ".jpeg" && this.form.imageFile != ".gif") {
      //   this.errors.image = "Image must be a .png, .jpg, .jpeg or .gif file.";
      //   isValid = false;
      // }
      if (this.form.imageFile > 2048 * 1024) {
        this.errors.image = "Image must be less than 2MB.";
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
          roadErrors[`road_${index}_name`] = "Road Name is required.";
        }
        if (!road.start_date) {
          roadErrors[`road_${index}_start_date`] =
            "Road Start Date is required.";
        } else if (roadStartDate < travelStartDate) {
          roadErrors[`road_${index}_start_date`] =
            "Road Start Date cannot be before the Travel Start Date.";
        } else if (roadStartDate > travelEndDate) {
          roadErrors[`road_${index}_start_date`] =
            "Road Start Date cannot be after the Travel End Date.";
        }
        if (!road.end_date) {
          roadErrors[`road_${index}_end_date`] = "Road End Date is required.";
        } else if (roadEndDate < roadStartDate) {
          roadErrors[`road_${index}_end_date`] =
            "Road End Date must be after Road Start Date.";
        } else if (roadEndDate > travelEndDate) {
          roadErrors[`road_${index}_end_date`] =
            "Road End Date cannot be after the Travel End Date.";
        }
        if (road.imageFile > 2048 * 1024) {
          roadErrors[`road_${index}_imageFile`] = "File size cannot exceed 2MB.";
        }
        // if (road.imageFile != ".jpeg" && road.imageFile != ".png" && road.imageFile != ".jpg" && road.imageFile != ".webp") {
        //   roadErrors[`road_${index}_imageFile`] = "File type must be .jpeg, .png, .jpg, or .webp.";
        // }
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
        const res = await fetch(this.store.api.baseUrl + "travel", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
          this.response = "Travel added successfully!";
          this.$router.push('/')
            .then(() => {
              window.location.reload(); // Forza il refresh della pagina
            })
            .catch(err => console.error("Error while redirecting:", err));
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
#map {
  width: 100%;
  height: 400px;
}

.results-container {
  border: 1px solid #ddd;
  max-height: 200px;
  overflow-y: auto;
}

.results-container div {
  padding: 5px;
  cursor: pointer;
}

.results-container div:hover {
  background-color: #f0f0f0;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
