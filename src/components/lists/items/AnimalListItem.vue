<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list-item v-else @click="" :to="'animals/' + object.id" dense>
        <v-list-item-icon>
            <v-icon v-if="first">{{ object._icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ object.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ species }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar size="20">
            <v-img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"> </v-img>
        </v-list-item-avatar>
    </v-list-item>
</template>

<script>
    import PassiveSingleComponent from "../../PassiveSingleComponent"
    import AnimalModel from "../../../store/models/Core/AnimalModel"

    export default {
        extends: PassiveSingleComponent,

        props: {
            first: Boolean
        },

        data () {
            return {
                model: AnimalModel
            }
        },

        computed: {
            species () {
                if (this.object.animal_species == null) return ''
                if (this.object.animal_species.name_latin == null) return this.object.animal_species.name_common
                return this.object.animal_species.name_latin
            }
        }
    }
</script>
