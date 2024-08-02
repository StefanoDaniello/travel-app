 <template>
    <div class="container">
        <div class="row">
            <div class="col-4" v-for="travel in store.data.travels">
                <CardComponents :travel="travel" />
            </div>
        </div>
    </div>
</template>

<script>
import CardComponents from '../components/CardComponents.vue'
import { store } from "../store";
    export default {
        name: 'HomePages',
        components: {
            CardComponents
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