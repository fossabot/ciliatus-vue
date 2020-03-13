<template>
    <v-container>
        <v-row align="start">
            <v-col sm="12">
                <physical-sensor-data-table> </physical-sensor-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import IndexView from "./IndexView"
    import PhysicalSensorDataTable from "../../components/tables/PhysicalSensorDataTable"
    import PhysicalSensorModel from "../../store/models/Monitoring/PhysicalSensorModel"

    export default {
        extends: IndexView,

        data () {
            return {
                model: PhysicalSensorModel,
            }
        },

        components: {
            PhysicalSensorDataTable
        }

    }
</script>
