<template>
   <edit-habitat-form :id="id"> </edit-habitat-form>
</template>

<script>
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import EditHabitatForm from "../../components/forms/edit/EditHabitatForm";
    import EditView from "./EditView";

    export default {
        extends: EditView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
           EditHabitatForm
        }
    }
</script>
