<template>
   <header>
        <div class="d-flex justify-content-between">
            <div>
                <h1>Travel App</h1>
            </div>
            <div>
                <router-link to="/" class="btn btn-primary mx-3 text-white"> Home</router-link>
                <router-link to="/travel" class="btn btn-success text-white"><i class="fa fa-plus"></i></router-link>
            </div>
        </div>
   </header>
</template>

<script>
    export default {
        name: 'HeaderComponents',
    }
</script>

<style lang="scss" scoped>

</style>