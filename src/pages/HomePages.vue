 <template>
    <div class="container">
        <div class="row" v-if="store.data.travels.length > 0">
            <div class="col-12 col-md-6 col-lg-4" v-for="travel in store.data.travels" >
                <CardComponents :travel="travel" />
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5" v-else>
            <img src="/images/no-travel.png" alt="Non ci sono ancora viaggi premi il tasto per aggiungerne uno ⬊">
        </div>
    </div>
</template>

<script>
import CardComponents from '../components/CardComponents.vue'
import LoaderComponent from '../components/LoaderComponent.vue'
import { store } from "../store";
    export default {
        name: 'HomePages',
        components: {
            CardComponents,
            LoaderComponent
        },
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>