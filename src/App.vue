<template>
  <div class="container mt-5">


    <HeaderComponents />


    <!-- <div class="d-flex justify-content-between align-items-center"  v-if="!isTravelRoute">
      <h1>Travel App</h1>
      <router-link to="/travel" class="btn btn-success"><i class="fa fa-plus"></i></router-link>
    </div> -->


    <div class="container d-flex justify-content-center mt-5">
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
  computed: {
    isTravelRoute() {
      return this.$route.path === '/travel';
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
</style>
