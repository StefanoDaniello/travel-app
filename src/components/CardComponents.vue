<template>
  <div>
    <div class="card" @click="showModal(travel)">
      <div class="image-container">
        <img :src="travel.image" :alt="travel.name" @error="travel.image = store.api.defaultImg" loading="lazy" class="card-img-top" >
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
            <input type="datetime-local" id="start_date" v-model="selectedTravel.start_date" required>
          </div>
          <div class="form-group">
            <label for="end_date">End Date:</label>
            <input type="datetime-local" id="end_date" v-model="selectedTravel.end_date" required>
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <input type="text" id="image" v-model="selectedTravel.image">
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
            <button type="submit" class="btn-submit" >Save Changes</button>
          </div>
        </form>
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
      };
    },
    // computed: {
    //   getImage() {
    //     return this.travel.image ? `${this.store.api.imgBasePath}${this.travel.image}` : this.store.api.defaultImg;
    //   }
    // },
    methods: {
      showModal(travel) {
        this.selectedTravel = { ...travel };
      },
      closeModal() {
        this.selectedTravel = null;
      },
      async updateTravel() {
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
  }
</script>

<style lang="scss" scoped>
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
    img{
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