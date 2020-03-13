<template>
        <v-skeleton-loader v-if="initial || !objects" transition="fade-transitions" height="120" type="card">
        </v-skeleton-loader>
        <v-card :loading="loading" v-else outlined>

            <v-card-title>Animals</v-card-title>

            <animal-list :linked-object="linkedObject"> </animal-list>
        </v-card>
</template>

<script>
    import PassiveMultiComponent from "../../PassiveMultiComponent"
    import AnimalList from "../../lists/AnimalList"
    import AnimalModel from "../../../store/models/Core/AnimalModel"

    export default {
        extends: PassiveMultiComponent,

        components: {
            AnimalList
        },

        data () {
            return {
                model: AnimalModel
            }
        }
    }
</script>
