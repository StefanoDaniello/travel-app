<template>
    <div class="card">
    <div class="image-container">
      <img :src="getImage" :alt="travel.name" @error="travel.image = store.api.defaultImg" loading="lazy" class="card-img-top" >
      <!-- <div class="badges">
        <span class="badge rounded-pill" > Badge</span>
      </div> -->
    </div>
    <div class="card-body">
      <p class="card-title fw-bold">{{ travel.name }}</p>
      <p class="address"> <strong>Start Date:</strong> {{ travel.start_date }}</p>
      <p class="address"><strong>End Date:</strong> {{ travel.end_date }}</p>
    </div>
  </div>
</template>

<script>
  import { store } from "../store";
    export default {
      name: 'CardComponents',	
      props: ['travel'],
      data() {
        return {
          store
        }
      },
      computed: {
        getImage() {
        //   return this.travel.image
        // ? `${this.store.api.imgBasePath}${this.travel.image}`
        // : this.store.api.defaultImg;

        return this.store.api.defaultImg;

        }
      }
    }
</script>

<style lang="scss" scoped>
    
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