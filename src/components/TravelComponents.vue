<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="travel-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>
      <div class="form-group">
        <label for="start_date">Start Date:</label>
        <input type="date" id="start_date" v-model="form.start_date" required>
      </div>
      <div class="form-group">
        <label for="end_date">End Date:</label>
        <input type="date" id="end_date" v-model="form.end_date" required>
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

      <div v-for="(road, index) in form.roads" :key="index" class="road-group">
        <h3>Road {{ index + 1 }}</h3>
        <div class="form-group">
          <label :for="'road_name_' + index">Road Name:</label>
          <input type="text" :id="'road_name_' + index" v-model="road.name" required>
        </div>
        <div class="form-group">
          <label :for="'road_description_' + index">Road Description:</label>
          <textarea :id="'road_description_' + index" v-model="road.description"></textarea>
        </div>
        <div class="form-group">
          <label :for="'road_start_date_' + index">Road Start Date:</label>
          <input type="date" :id="'road_start_date_' + index" v-model="road.start_date" required>
        </div>
        <div class="form-group">
          <label :for="'road_end_date_' + index">Road End Date:</label>
          <input type="date" :id="'road_end_date_' + index" v-model="road.end_date" required>
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
          <input type="number" :id="'road_rate_' + index" v-model="road.rate" required>
        </div>
        <div class="form-group">
          <label :for="'road_note_' + index">Road Note:</label>
          <textarea :id="'road_note_' + index" v-model="road.note"></textarea>
        </div>
      </div>

      <div class="form-group">
        <button type="button" class="btn btn-primary mx-3 text-white" @click="addRoad">Add Road</button>
        <button type="submit" class="btn btn-success text-white">Add Travel</button>
      </div>
    </form>
    <div v-if="response" class="response-message">
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
            previewImage: ''
          }
        ]
      },
      imageFile: null,
      response: null,
      previewImage: '',
    }
  },
  methods: {
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
        previewImage: ''
      });
    },
    async submitForm() {
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
          this.$router.push('/');  // Reindirizzamento alla rotta /
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
  width: 600px;  // Increased width
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
input[type="datetime-local"] {
  width: 100%;
  padding: 12px;  // Increased padding
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  padding: 12px 20px;  // Increased padding
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-submit:hover {
  background-color: #218838;
}

.response-message {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>

