<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <CardComponents />
            </div>
        </div>
    </div>
</template>

<script>
import CardComponents from '../components/CardComponents.vue'
    export default {
        name: 'HomePages',
        components: {
            CardComponents
        },
    }
</script>

<style lang="scss" scoped>

</style>