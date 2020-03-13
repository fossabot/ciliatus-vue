<template>
    <animal-card-stream :on-initial-load-done="onInitialDone"> </animal-card-stream>
</template>

<script>
    import IndexView from "./IndexView"
    import AnimalCardStream from "../../components/cardstreams/AnimalCardStream"
    import AnimalModel from "../../store/models/Core/AnimalModel"

    export default {
        extends: IndexView,

        data () {
            return {
                model: AnimalModel
            }
        },

        components: {
            AnimalCardStream
        }
    }
</script>
