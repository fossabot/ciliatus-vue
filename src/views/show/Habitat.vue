<template>
    <v-container>
        <habitat-details :on-initial-load-done="onInitialDone" :id="id"> </habitat-details>
    </v-container>
</template>

<script>
    import ShowView from "./ShowView"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import HabitatDetails from "../../components/details/HabitatDetails"

    export default {
        extends: ShowView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
            HabitatDetails
        },

        computed: {
            object () {
                return HabitatModel.query().with('animals').find(this.id)
            }
        },

        mounted () {
            this.$root.$emit('ResetLoading', 1)
        }
    }
</script>
