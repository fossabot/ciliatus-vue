<template>
        <v-skeleton-loader v-if="initial" transition="fade-transitions" height="120" type="card">
        </v-skeleton-loader>
        <v-card :loading="loading" v-else-if="object" outlined>
            <card-title v-if="object" :link="model.view('show', object)">
                <template v-slot:icon>mdi-application</template>
                <template v-slot:title>{{ object.name }}</template>
                <template v-slot:subtitle>{{ object.type.name }}</template>
            </card-title>

            <v-img class="white--text align-end border_radius_top_inherit"
                    height="120px"
                   style="" :src="'https://loremflickr.com/320/120/terrarium?random=' + Math.random() * 10000">
            </v-img>

            <v-list v-if="!noAnimals && object.animals">
                <animal-list :linked-object="object.animals"> </animal-list>
            </v-list>

            <habitat-render v-if="withRender" :linked-object="object"> </habitat-render>

            <v-divider />

            <v-card-actions>
                <v-btn v-if="withRender" text @click="render" :loading="renderLoading">Render</v-btn>

                <monitor-chips :monitor="object._monitor"> </monitor-chips>

                <v-spacer />

                <error-icon v-if="error"> </error-icon>

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn icon @click="refresh()">
                            <v-icon v-on="on">mdi-refresh</v-icon>
                        </v-btn>
                    </template>
                    <span>Refresh Habitat</span>
                </v-tooltip>

                <router-link :to="model.view('edit', object)">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn icon>
                                <v-icon v-on="on">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit Habitat</span>
                    </v-tooltip>
                </router-link>

                <router-link :to="model.view('show', object)">
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-btn icon>
                                <v-icon v-on="on">mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>Show Habitat</span>
                    </v-tooltip>
                </router-link>

            </v-card-actions>
        </v-card>
</template>

<script>
    import SingleComponent from "../../SingleComponent"
    import ModelFactory from "../../../store/models/ModelFactory"
    import AnimalList from "../../lists/AnimalList"
    import ErrorIcon from "../../misc/ErrorIcon"
    import HabitatRender from "../../misc/HabitatRender"
    import HabitatModel from "../../../store/models/Core/HabitatModel"
    import MonitorChips from "../../misc/MonitorChips"
    import CardTitle from "../CardTitle"

    export default {
        extends: SingleComponent,

        components: {
            AnimalList, ErrorIcon, HabitatRender, MonitorChips, CardTitle
        },

        props: {
            noAnimals: Boolean,
            withRender: Boolean
        },

        data () {
            return {
                model: HabitatModel,
                renderLoading: false
            }
        },

        computed: {
            object () {
                let query = this.model.query().with('habitat_type')
                if (!this.noAnimals) query = query.with('animals')

                return query.find(this.id)
            },
            type () {
                if (!this.object.type) return ''
                return this.object.type.name
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, ['animals', 'type'])
            },
            render () {
                this.$refs.habitatRender.render(this)
            }
        }
    }
</script>
