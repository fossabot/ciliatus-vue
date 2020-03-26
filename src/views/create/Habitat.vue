<template>
   <create-habitat-form> </create-habitat-form>
</template>

<script>
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import CreateHabitatForm from "../../components/forms/create/CreateHabitatForm";
    import CreateView from "./CreateView";

    export default {
        extends: CreateView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
           CreateHabitatForm
        },

        mounted () {
            this.setTitle('Create Habitat') // @TODO: Translate
        }
    }
</script>
