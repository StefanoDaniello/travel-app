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
        <h2>Edit Travel</h2>
        <form @submit.prevent="updateTravel">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="selectedTravel.name" required>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="selectedTravel.description"></textarea>
          </div>
          <div class="form-group">
            <label for="start_date">Start Date:</label>
            <input type="date" id="start_date" v-model="selectedTravel.start_date" required>
          </div>
          <div class="form-group">
            <label for="end_date">End Date:</label>
            <input type="date" id="end_date" v-model="selectedTravel.end_date" required>
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <input type="file" id="image" @change="handleFileChange">
            <div class="image-preview">
              <img :src="previewImage" @error="setDefaultImg" alt="Image preview">
            </div>
          </div>
          <div class="form-group">
            <label for="meal">Meal:</label>
            <textarea id="meal" v-model="selectedTravel.meal"></textarea>
          </div>
          <div class="form-group">
            <label for="curiosity">Curiosity:</label>
            <textarea id="curiosity" v-model="selectedTravel.curiosity"></textarea>
          </div>
          <div class="form-group">
            <label for="road_name">Road Name:</label>
            <input type="text" id="road_name" v-model="selectedTravel.road.name" required>
          </div>
          <div class="form-group">
            <label for="road_description">Road Description:</label>
            <textarea id="road_description" v-model="selectedTravel.road.description"></textarea>
          </div>
          <div class="form-group">
            <label for="road_start_date">Road Start Date:</label>
            <input type="date" id="road_start_date" v-model="selectedTravel.road.start_date" required>
          </div>
          <div class="form-group">
            <label for="road_end_date">Road End Date:</label>
            <input type="date" id="road_end_date" v-model="selectedTravel.road.end_date" required>
          </div>
          <div class="form-group">
            <label for="road_image">Road Image:</label>
            <input type="file" id="road_image" @change="handleRoadFileChange">
            <div class="image-preview">
              <img :src="roadPreviewImage" @error="setDefaultRoadImg" alt="Road image preview" />
            </div>
          </div>
          <div class="form-group">
            <label for="road_rate">Road Rate:</label>
            <input type="number" id="road_rate" v-model="selectedTravel.road.rate" required>
          </div>
          <div class="form-group">
            <label for="road_note">Road Note:</label>
            <textarea id="road_note" v-model="selectedTravel.road.note"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="btn-submit">Save Changes</button>
          </div>
        </form>
        <div v-if="response" class="response-message">
          <p>{{ response }}</p>
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
      imageFile: null,
      roadImageFile: null,
      previewImage: '',
      roadPreviewImage: '',
      defaultImg: '/images/placeholder.png',
      response: null
    };
  },
  computed: {
    getImage() {
      return this.travel.image ? `${this.store.api.imgBasePath}${this.travel.image}` : this.defaultImg;
    },
  },
  methods: {
    handleImgError(event) {
      event.target.src = this.defaultImg;
    },
    showModal(travel) {
      this.selectedTravel = { ...travel, road: { ...travel.road } };
      this.previewImage = this.getImage; // Imposta l'immagine di anteprima
      this.roadPreviewImage = travel.road?.image ? `${this.store.api.imgBasePath}${travel.road.image}` : this.defaultImg;
    },
    closeModal() {
      this.selectedTravel = null;
      this.imageFile = null;
      this.roadImageFile = null;
      this.previewImage = '';
      this.roadPreviewImage = '';
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.previewImage = URL.createObjectURL(file);
        this.imageFile = file;
      }
    },
    handleRoadFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.roadPreviewImage = URL.createObjectURL(file);
        this.roadImageFile = file;
      }
    },
    setDefaultImg(event) {
      event.target.src = this.defaultImg;
    },
    setDefaultRoadImg(event) {
      event.target.src = this.defaultImg;
    },
    async updateTravel() {
      if (this.imageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = async () => {
          this.selectedTravel.image = reader.result;
          await this.submitUpdate();
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          this.response = 'Error reading file!';
        };
      } else {
        await this.submitUpdate();
      }

      if (this.roadImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.roadImageFile);
        reader.onload = async () => {
          this.selectedTravel.road.image = reader.result;
          await this.submitUpdate();
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          this.response = 'Error reading file!';
        };
      } else {
        await this.submitUpdate();
      }
    },
    async submitUpdate() {
      try {
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
          this.response = 'Travel updated successfully!';
          this.closeModal();
          window.location.reload();
        } else {
          this.response = 'Error updating travel!';
        }
        console.log(data);
      } catch (error) {
        this.response = 'Error updating travel!';
        console.error(error);
      }
    }
  }
};
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
  border-radius: 5px;
  width: 500px;
  max-width: 100%;
}

.close {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
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
</style>