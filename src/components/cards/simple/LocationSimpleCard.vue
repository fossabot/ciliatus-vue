<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <v-sheet class="border_radius_bottom_none"
                 elevation="8">
            <v-img class="white--text align-end border_radius_top_inherit"
                   height="120px"
                   :src="'https://loremflickr.com/320/120/house?random=' + Math.random() * 10000"> </v-img>
        </v-sheet>

        <card-title v-if="object">
            <template v-slot:icon>{{ object._icon }}</template>
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>Location: {{ object.type.name }}</template>
        </card-title>

        <monitor-card-subtitle :monitor="object._monitor"> </monitor-card-subtitle>

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
    import LocationModel from "../../../store/models/Core/LocationModel"
    import MonitorCardSubtitle from "../MonitorCardSubtitle"
    import CardTitle from "../CardTitle"

    export default {
        extends: SingleComponent,

        components: {
            MonitorCardSubtitle, CardTitle
        },

        data () {
            return {
                model: LocationModel
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, ['type', 'animals'])
            }
        }
    }
</script>
