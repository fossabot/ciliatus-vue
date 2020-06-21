<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <v-sheet class="border_radius_bottom_none"
                 elevation="8">
            <v-img class="white--text align-end border_radius_top_inherit"
                   height="120px"
                   :src="'https://loremflickr.com/320/120/terrarium?random=' + Math.random() * 10000"> </v-img>
        </v-sheet>

        <card-title v-if="object">
            <template v-slot:icon>{{ object._icon }}</template>
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>Habitat: {{ object.type.name }}</template>
        </card-title>

        <habitat-render ref="habitatRender" v-if="withRender" :linked-object="object" :render-on-load="renderOnLoad"> </habitat-render>

        <v-card-actions v-if="!noActions">
            <v-btn v-if="withRender" text @click="render" :loading="renderLoading">Render</v-btn>

            <v-spacer />

            <v-btn icon @click="refresh()">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import SingleComponent from "../../SingleComponent"
    import HabitatRender from "../../misc/HabitatRender"
    import HabitatModel from "../../../store/models/Core/HabitatModel"
    import CardTitle from "../CardTitle";

    export default {
        extends: SingleComponent,

        components: {
            HabitatRender, CardTitle
        },

        props: {
            noAnimals: Boolean,
            withRender: Boolean,
            renderOnLoad: Boolean
        },

        data () {
            return {
                model: HabitatModel,
                renderLoading: false
            }
        },

        methods: {
            render () {
                this.$refs.habitatRender.render(this)
            }
        }
    }
</script>
