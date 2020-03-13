<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <card-title v-if="object">
            <template v-slot:icon>{{ object._icon }}</template>
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>Sensor: {{ object.type.model }}</template>
        </card-title>

        <sensor-list v-if="object.logical_sensors" :icon-only-first="false" :linked-object="object"> </sensor-list>

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
    import SensorList from "../../lists/SensorList"
    import PhysicalSensorModel from "../../../store/models/Monitoring/PhysicalSensorModel"

    export default {
        extends: SingleComponent,

        components: {
            SensorList, CardTitle
        },

        data () {
            return {
                model: PhysicalSensorModel
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.id, 'logical_sensors')
            }
        }
    }
</script>
