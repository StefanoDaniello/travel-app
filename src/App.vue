<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description"></textarea>
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input type="datetime-local" id="start_date" v-model="form.start_date" required>
      </div>
      <div>
        <label for="end_date">End Date:</label>
        <input type="datetime-local" id="end_date" v-model="form.end_date" required>
      </div>
      <div>
        <label for="image">Image URL:</label>
        <input type="text" id="image" v-model="form.image">
      </div>
      <div>
        <label for="meal">Meal:</label>
        <textarea id="meal" v-model="form.meal"></textarea>
      </div>
      <div>
        <label for="curiosity">Curiosity:</label>
        <textarea id="curiosity" v-model="form.curiosity"></textarea>
      </div>
      <div>
        <button type="submit">Add Travel</button>
      </div>
    </form>
    <div v-if="response">
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
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

</style>
