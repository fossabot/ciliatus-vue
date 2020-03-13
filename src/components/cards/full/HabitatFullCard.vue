<template>
        <v-skeleton-loader v-if="initial" transition="fade-transitions" height="120" type="card">
        </v-skeleton-loader>
        <v-card :loading="loading" v-else-if="object" outlined>
            <card-title v-if="object">
                <template v-slot:icon>{{ object._icon }}</template>
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

            <monitor-card-subtitle :monitor="object._monitor"> </monitor-card-subtitle>

            <v-divider />

            <v-card-actions>
                <v-btn v-if="withRender" text @click="render" :loading="renderLoading">Render</v-btn>

                <router-link :to="'habitats/' + object.id">
                    <v-btn text>Details</v-btn>
                </router-link>

                <v-spacer />

                <error-icon v-if="error"> </error-icon>

                <v-btn icon @click="refresh()">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
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
    import MonitorCardSubtitle from "../MonitorCardSubtitle";
    import CardTitle from "../CardTitle";

    export default {
        extends: SingleComponent,

        components: {
            AnimalList, ErrorIcon, HabitatRender, MonitorCardSubtitle, CardTitle
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
                let query = this.model.query().with('type')
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
