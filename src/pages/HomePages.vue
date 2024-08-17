 <template>
    <div class="container">
        <div class="row" v-if="store.data.travels.length > 0">
            <div class="col-12 col-md-6 col-lg-4" v-for="travel in store.data.travels" >
                <CardComponents :travel="travel" />
            </div>
        </div>
        <!-- se ho faccio l'acesso -->
       
        <!-- se non ho fatto l'acessso -->
        <div class="d-flex justify-content-center align-items-center mt-5" v-if="store.user.id == null">
            <div class="text-center">
                <h1 class="mb-3">Benvenuto!</h1>
                <p class="mb-4">Accedi o registrati per continuare</p>
                <div>
                    <router-link class="btn btn-primary me-2 text-white" to="/login">
                        Accedi
                    </router-link>
                    <router-link class="btn btn-secondary" to="/register">
                        Registrati
                    </router-link>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-5" v-else-if="store.data.travels.length == 0">
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
        },
        mounted() {
            this.store.user.id
        }
    }
</script>

<style lang="scss" scoped>

</style>