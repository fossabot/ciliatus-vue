<template>
    <v-container>
        <habitat-details :on-initial-load-done="onInitialDone" :id="id"> </habitat-details>

        <model-speed-dial :model="model" :object="object" create edit del> </model-speed-dial>
    </v-container>
</template>

<script>
    import ShowView from "./ShowView"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import HabitatDetails from "../../components/details/HabitatDetails"
    import ModelSpeedDial from "../../components/misc/ModelSpeedDial";

    export default {
        extends: ShowView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
            HabitatDetails, ModelSpeedDial
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
