<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center"  v-if="!isTravelRoute">
      <h1>Travel App</h1>
      <router-link to="/travel" class="btn btn-success"><i class="fa fa-plus"></i></router-link>
    </div>

    <div class="container d-flex justify-content-center mt-5">
      <router-view></router-view>
    </div>
  </div>



</template>

<script>
export default {
  name: 'App',
  computed: {
    isTravelRoute() {
      return this.$route.path === '/travel';
    }
  },
}
</script>

<style lang="scss" scoped></style>
