<template>
    <v-skeleton-loader :loading="initial" transition="fade-transitions" height="120" type="card">
        <v-card :loading="loading" outlined>
            <card-title v-if="object">
                <template v-slot:icon>{{ object._icon }}</template>
                <template v-slot:title>{{ object.name }}</template>
                <template v-slot:subtitle>{{ object.species_name }}</template>
            </card-title>

            <v-img class="white--text align-end border_radius_top_inherit"
                    height="120px"
                    style="" :src="'https://loremflickr.com/320/120/reptile?random=' + Math.random() * 10000">
            </v-img>

            <v-divider />

            <v-card-actions>
                <v-btn text>Details</v-btn>

                <v-spacer />

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" v-show="error">
                            <v-icon color="red">mdi-alert-circle-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>{{ error }}</span>
                </v-tooltip>

                <v-btn icon @click="refresh()">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-skeleton-loader>
</template>

<script>
    import SingleComponent from "../../SingleComponent"
    import ModelFactory from "../../../store/models/ModelFactory"
    import AnimalModel from "../../../store/models/Core/AnimalModel"
    import CardTitle from "../CardTitle";

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

        computed: {
            object () {
                return this.model.query().with('animal_species').with('habitat').find(this.id)
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, ['animal_species', 'habitat' ])
            }
        }
    }
</script>
