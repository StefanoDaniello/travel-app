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
        <input type="datetime-local" id="start_date" v-model="form.start_date" required>
      </div>
      <div class="form-group">
        <label for="end_date">End Date:</label>
        <input type="datetime-local" id="end_date" v-model="form.end_date" required>
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
      <div class="form-group">
        <button type="submit" class="btn-submit">Add Travel</button>
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
                curiosity: ''
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
        setDefaultImg(event) {
            event.target.src = this.store.api.defaultImg;
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

