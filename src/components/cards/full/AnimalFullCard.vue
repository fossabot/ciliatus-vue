<template>
    <v-skeleton-loader :loading="initial" transition="fade-transitions" height="120" type="card">
        <v-card :loading="loading" outlined>
            <card-title v-if="object" :link="model.view('show', object)">
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
                <v-spacer />

                <error-icon v-if="error"> </error-icon>

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon @click="refresh()">
                            <v-icon v-on="on">mdi-refresh</v-icon>
                        </v-btn>
                    </template>
                    <span>Refresh Animal</span>
                </v-tooltip>

                <router-link :to="model.view('edit', object)">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn icon>
                                <v-icon v-on="on">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Animal</span>
                    </v-tooltip>
                </router-link>

                <router-link :to="model.view('show', object)">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn icon>
                                <v-icon v-on="on">mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>Show Animal</span>
                    </v-tooltip>
                </router-link>

            </v-card-actions>
        </v-card>
    </v-skeleton-loader>
</template>

<script>
    import SingleComponent from "../../SingleComponent"
    import ModelFactory from "../../../store/models/ModelFactory"
    import AnimalModel from "../../../store/models/Core/AnimalModel"
    import CardTitle from "../CardTitle"
    import ErrorIcon from "../../misc/ErrorIcon"

    export default {
        extends: SingleComponent,

        components: {
            CardTitle, ErrorIcon
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
