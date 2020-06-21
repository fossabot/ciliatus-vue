<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <v-sheet class="border_radius_bottom_none"
                 elevation="8">
            <v-img class="white--text align-end border_radius_top_inherit"
                   height="120px"
                   :src="'https://loremflickr.com/320/120/reptile?random=' + Math.random() * 10000">
            </v-img>
        </v-sheet>

        <card-title v-if="object">
            <template v-slot:icon>{{ object._icon }}</template>
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>{{ object.species_name }}</template>
        </card-title>

        <v-card-actions v-if="!noActions">
            <v-spacer />

            <v-btn icon @click="refresh()">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SingleComponent from "../../SingleComponent"
    import ModelFactory from "../../../store/models/ModelFactory"
    import CardTitle from "../CardTitle"
    import AnimalModel from "../../../store/models/Core/AnimalModel"

    export default {
        extends: SingleComponent,

        components: {
            CardTitle
        },

        data () {
            return {
                model: AnimalModel
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.id)
            }
        }
    }
</script>
