<template>
    <div class="card">
    <div class="image-container">
      <img src="https://picsum.photos/200" alt=""  loading="lazy" class="card-img-top">
      <div class="badges">
        <span class="badge rounded-pill" > kqwbefu</span>
      </div>
    </div>
    <div class="card-body">
      <p class="card-title fw-bold">hjwberf</p>
      <p class="address">hjwberf</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'CardComponents',	
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