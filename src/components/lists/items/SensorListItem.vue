<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list-item v-else @click="" :to="'physical_sensors/' + object.physical_sensor_id" :class="card_state">
        <v-list-item-icon>
            <v-icon small v-if="first">{{ object.type._icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ object.name }}</v-list-item-title>
            <v-list-item-subtitle>
                {{ object.type.name }}
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <error-icon v-if="object.state === 'error'" :error="object.state_text"> </error-icon>
            <span v-else>{{ object.current_reading_corrected_rounded }}{{ object.type.reading_type_symbol }}</span>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import PassiveSingleComponent from "../../PassiveSingleComponent"
    import LogicalSensorModel from "../../../store/models/Monitoring/LogicalSensorModel"
    import ErrorIcon from "../../misc/ErrorIcon";

    export default {
        components: {ErrorIcon},
        extends: PassiveSingleComponent,

        props: {
            first: Boolean
        },

        computed: {
            card_state () {
                switch (this.object.state) {
                    case 'ok':
                        return 'border-ok';
                    case 'notok':
                        return 'border-notok';
                    case 'error':
                        return 'border-error';
                    default:
                        return 'border-unknown';
                }
            }
        },

        data () {
            return {
                model: LogicalSensorModel
            }
        }
    }
</script>
