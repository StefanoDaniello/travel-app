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
        <input type="text" id="image" v-model="form.image">
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
export default {
  name: 'TravelComponents',
  data() {
    return {
      form: {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        image: '',
        meal: '',
        curiosity: ''
      },
      response: null
    }
  },
  methods: {
    async submitForm() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/travel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.form)
        });
        const data = await res.json();
        this.response = 'Travel added successfully!';
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
.form-container {
  max-width: 600px;
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
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
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
