<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="travel-form">
      <!-- Travel Form Fields -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name">
        <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>
      <div class="form-group">
        <label for="start_date">Start Date:</label>
        <input type="date" id="start_date" v-model="form.start_date">
        <span v-if="errors.start_date" class="error-message">{{ errors.start_date }}</span>
      </div>
      <div class="form-group">
        <label for="end_date">End Date:</label>
        <input type="date" id="end_date" v-model="form.end_date">
        <span v-if="errors.end_date" class="error-message">{{ errors.end_date }}</span>
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleFileUpload">
        <div class="image-preview">
          <img :src="previewImage" @error="setDefaultImg" alt="Image preview" />
        </div>
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
        <h3>Road {{ index + 1 }}</h3>
        <div class="form-group">
          <label :for="'road_name_' + index">Road Name:</label>
          <input type="text" :id="'road_name_' + index" v-model="road.name">
          <span v-if="errors[`road_${index}_name`] " class="error-message">{{ errors[`road_${index}_name`] }}</span>
        </div>
        <div class="form-group">
          <label :for="'road_description_' + index">Road Description:</label>
          <textarea :id="'road_description_' + index" v-model="road.description"></textarea>
        </div>
        <div class="form-group">
          <label :for="'road_start_date_' + index">Road Start Date:</label>
          <input type="date" :id="'road_start_date_' + index" v-model="road.start_date">
          <span v-if="errors[`road_${index}_start_date`] " class="error-message">{{ errors[`road_${index}_start_date`] }}</span>
        </div>
        <div class="form-group">
          <label :for="'road_end_date_' + index">Road End Date:</label>
          <input type="date" :id="'road_end_date_' + index" v-model="road.end_date">
          <span v-if="errors[`road_${index}_end_date`] " class="error-message">{{ errors[`road_${index}_end_date`] }}</span>
        </div>
        <div class="form-group">
          <label :for="'road_image_' + index">Road Image:</label>
          <input type="file" :id="'road_image_' + index" @change="event => handleRoadFileUpload(event, index)">
          <div class="image-preview">
            <img :src="road.previewImage || store.api.defaultImg" @error="setDefaultRoadImg" alt="Road image preview" />
          </div>
        </div>
        <div class="form-group">
          <label :for="'road_rate_' + index">Road Rate:</label>
          <div class="star-rating">
            <span v-for="star in 5" :key="star" class="star"
                  :class="{ filled: star <= road.rate }"
                  @click="setRoadRating(index, star)">&#9733;</span>
          </div>
        </div>
        <div class="form-group">
          <label :for="'road_note_' + index">Road Note:</label>
          <textarea :id="'road_note_' + index" v-model="road.note"></textarea>
        </div>
      </div>

      <!-- Buttons -->
      <div class="form-group">
        <button type="button" class="btn btn-primary mx-3 text-white" @click="addRoad">Add Road</button>
        <button type="submit" class="btn btn-success text-white">Add Travel</button>
      </div>
    </form>
    <div v-if="response" class="response-message" ref="responseMessage">
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: 'TravelComponent',
  data() {
    return {
      store,
      form: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        meal: '',
        curiosity: '',
        roads: [
          {
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            rate: 0,
            note: '',
            previewImage: '',
            imageFile: null
          }
        ]
      },
      imageFile: null,
      previewImage: '',
      response: null,
      errors: {}
    };
  },
  methods: {
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
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        rate: 0,
        note: '',
        previewImage: '',
        imageFile: null
      });
    },
    setRoadRating(index, rating) {
      this.form.roads[index].rate = rating;
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
          roadErrors[`road_${index}_start_date`] = "Road Start Date is required.";
        } else if (roadStartDate < travelStartDate) {
          roadErrors[`road_${index}_start_date`] = "Road Start Date cannot be before the Travel Start Date.";
        } else if (roadStartDate > travelEndDate) {
          roadErrors[`road_${index}_start_date`] = "Road Start Date cannot be after the Travel End Date.";
        }
        if (!road.end_date) {
          roadErrors[`road_${index}_end_date`] = "Road End Date is required.";
        } else if (roadEndDate < roadStartDate) {
          roadErrors[`road_${index}_end_date`] = "Road End Date must be after Road Start Date.";
        } else if (roadEndDate > travelEndDate) {
          roadErrors[`road_${index}_end_date`] = "Road End Date cannot be after the Travel End Date.";
        }
      });

      return roadErrors;
    },
    scrollToFirstError() {
      this.$nextTick(() => {
        const firstErrorElement = this.$el.querySelector('.error-message');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    },
    async submitForm() {
      if (!this.validateForm()) {
        this.scrollToFirstError();
        return;
      }

      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('start_date', this.form.start_date);
      formData.append('end_date', this.form.end_date);
      formData.append('meal', this.form.meal);
      formData.append('curiosity', this.form.curiosity);
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.form.roads.forEach((road, index) => {
        formData.append(`roads[${index}][name]`, road.name);
        formData.append(`roads[${index}][description]`, road.description);
        formData.append(`roads[${index}][start_date]`, road.start_date);
        formData.append(`roads[${index}][end_date]`, road.end_date);
        formData.append(`roads[${index}][rate]`, road.rate);
        formData.append(`roads[${index}][note]`, road.note);
        if (road.imageFile) {
          formData.append(`roads[${index}][image]`, road.imageFile);
        }
      });

      try {
        const res = await fetch(this.store.api.baseUrl + 'travel', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
        const data = await res.json();
        if (res.ok) {
          this.response = 'Travel added successfully!';
          this.$router.push('/');  // Redirect to home
        } else {
          this.response = 'Error adding travel!';
        }
        console.log(data);
      } catch (error) {
        this.response = 'Error adding travel!';
        console.error(error);
      }
    }
  }
}
</script>






<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 5px;
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

.form-container {
  width: 800px;  // Increased width
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
  padding: 12px;  // Increased padding
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

textarea {
  height: 100px;  // Increased height for better readability
  resize: vertical;  // Allow vertical resizing
}

.star-rating {
  display: flex;
  margin-bottom: 15px;
}

.star {
  font-size: 24px;  // Increased star size
  color: #d3d3d3;  // Light grey for empty stars
  cursor: pointer;
  margin-right: 5px;
}

.star.filled {
  color: gold;  // Gold color for filled stars
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;  // Increased padding
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
  padding: 12px 20px;  // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-success:hover {
  background-color: #218838;
}

.response-message {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
