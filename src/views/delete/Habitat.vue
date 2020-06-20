<template>
   <delete-habitat-form :id="id"> </delete-habitat-form>
</template>

<script>
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import DeleteHabitatForm from "../../components/forms/delete/DeleteHabitatForm";
    import DeleteView from "./DeleteView";

    export default {
        extends: DeleteView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
           DeleteHabitatForm
        }
    }
</script>
