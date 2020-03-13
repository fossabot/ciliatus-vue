<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list v-else dense>
        <sensor-list-item
                v-for="(logical_sensor, index) in object.logical_sensors"
                v-bind:data="logical_sensor" v-bind:key="logical_sensor.id"
                :linked-object="logical_sensor"
                :first="index === 0 || !iconOnlyFirst">
        </sensor-list-item>
    </v-list>
</template>

<script>
    import PhysicalSensorModel from "../../store/models/Monitoring/PhysicalSensorModel"
    import SensorListItem from "./items/SensorListItem"
    import PassiveSingleComponent from "../PassiveSingleComponent";

    export default {
        extends: PassiveSingleComponent,

        props: {
            iconOnlyFirst: Boolean
        },

        data () {
            return {
                model: PhysicalSensorModel
            }
        },

        components: {
            SensorListItem
        }
    }
</script>
