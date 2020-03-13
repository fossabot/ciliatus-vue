<template>
    <v-skeleton-loader v-if="!objects" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list v-else>
        <animal-list-item
                v-for="(animal, index) in objects"
                v-bind:data="animal" v-bind:key="animal.id"
                :linked-object="animal"
                :first="index === 0">
        </animal-list-item>
    </v-list>
</template>

<script>
    import PassiveMultiComponent from "../PassiveMultiComponent"
    import AnimalListItem from "./items/AnimalListItem"
    import AnimalModel from "../../store/models/Core/AnimalModel"

    export default {
        extends: PassiveMultiComponent,

        props: {
            ids: Array
        },

        data () {
            return {
                model: AnimalModel
            }
        },

        components: {
            AnimalListItem
        }
    }
</script>
