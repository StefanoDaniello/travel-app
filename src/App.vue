<template>
  <div class="container">
    <HeaderComponents />
    <div class="container d-flex justify-content-center container-view">
      <router-view></router-view>
    </div>
  </div>



</template>

<script>
import axios from 'axios';
import { store } from "./store";  
import HeaderComponents from './components/HeaderComponents.vue';
export default {
  name: 'App',
  components: {
    HeaderComponents
  },
  data() {
    return {
      store
    }
  },
 
  methods: {
    getTravels() {
      axios
        .get(this.store.api.baseUrl+ 'travel')
        .then((response) => {
          this.store.data.travels = response.data;
          console.log( this.store.data.travels);
        })
        .catch((error) => {
          console.error(error);
        })
    },
   
  },
  mounted() {
    this.getTravels();
  },
}
</script>

<style lang="scss" scoped>
.container-view {
  margin-top: 100px;
}
</style>
