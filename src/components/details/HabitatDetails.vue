<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card"></v-skeleton-loader>
    <v-card v-else outlined>
        <v-container>
            <v-row>
                <v-col xs="12" sm="12" md="5" lg="4" xl="3">
                    <v-row>
                        <v-col>
                            <habitat-simple-card :id="id"
                                                 :no-initial-load="true"
                                                 :with-render="true">
                            </habitat-simple-card>
                        </v-col>
                    </v-row>

                    <v-row v-if="object.location">
                        <v-col>
                            <location-simple-card :linked-object="object.location"
                                                  :no-actions="true"
                                                  :no-initial-load="true">
                            </location-simple-card>
                        </v-col>
                    </v-row>

                    <v-row v-if="object.animals" v-for="(animal, index) in object.animals"
                           v-bind:data="animal" v-bind:key="animal.id">
                        <v-col>
                            <animal-simple-card :linked-object="animal"
                                                :no-actions="true"
                                                :no-initial-load="true">
                            </animal-simple-card>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col xs="12" sm="12" md="5" lg="4" xl="3">
                    <template v-if="object._monitor">
                        <v-row v-for="(monitor, index) in Object.keys(object._monitor)"
                               v-bind:data="object._monitor[monitor]" v-bind:key="monitor">
                            <v-col>
                                <monitor-sparkline-card :monitor="object._monitor[monitor]"> </monitor-sparkline-card>
                            </v-col>
                        </v-row>
                    </template>
                    <v-row v-else>
                        <v-col>
                            <generic-card title="No monitor" text="Add sensors to view metric monitor"> </generic-card>
                        </v-col>
                    </v-row>

                    <v-row v-if="object.physical_sensors.length > 0" v-for="(physical_sensor, index) in object.physical_sensors"
                           v-bind:data="physical_sensor" v-bind:key="physical_sensor.id">
                        <v-col>
                            <physical-sensor-simple-card :linked-object="physical_sensor" :no-actions="true"> </physical-sensor-simple-card>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col xs="12" sm="12" md="5" lg="4" xl="3">
                    <v-row v-if="object.appliance_groups.length > 0" v-for="(group, index) in object.appliance_groups"
                           v-bind:data="group" v-bind:key="group.id">
                        <v-col>
                            <appliance-group-simple-card :linked-object="group"
                                                :no-actions="true"
                                                :no-initial-load="true">
                            </appliance-group-simple-card>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <generic-card title="No appliances" text="Add appliances for automation"> </generic-card>
                    </v-row>
                </v-col>

                <v-col xs="12" sm="12" md="5" lg="4" xl="3">
                    <v-row v-if="object.workflows.length > 0" v-for="(workflow, index) in object.workflows"
                           v-bind:data="workflow" v-bind:key="workflow.id">
                        <v-col>
                            <workflow-simple-card :linked-object="workflow"
                                                  :no-actions="true"
                                                  :no-initial-load="true">
                            </workflow-simple-card>
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <generic-card title="No workflows" text="Add workflows for automation"> </generic-card>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import SingleComponent from "../SingleComponent"
    import ModelFactory from "../../store/models/ModelFactory"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import MonitorSparklineCard from "../cards/MonitorSparklineCard"
    import HabitatSimpleCard from "../cards/simple/HabitatSimpleCard"
    import AnimalSimpleCard from "../cards/simple/AnimalSimpleCard"
    import LocationSimpleCard from "../cards/simple/LocationSimpleCard"
    import GenericCard from "../cards/GenericCard"
    import PhysicalSensorSimpleCard from "../cards/simple/PhysicalSensorSimpleCard"
    import ApplianceGroupSimpleCard from "../cards/simple/ApplianceGroupSimpleCard"
    import WorkflowSimpleCard from "../cards/simple/WorkflowSimpleCard";

    export default {
        extends: SingleComponent,

        components: {
            PhysicalSensorSimpleCard, WorkflowSimpleCard,
            GenericCard,
            AnimalSimpleCard, HabitatSimpleCard, LocationSimpleCard, MonitorSparklineCard, ApplianceGroupSimpleCard
        },

        data () {
            return {
                model: HabitatModel,
                renderLoading: false,
                recursionDepth: 5
            }
        },

        computed: {
            object () {
                return this.model.query().withAllRecursive().find(this.id)
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, this.model.getRelationNames())
            },
            render () {
                this.$refs.habitatRender.render(this)
            }
        }
    }
</script>
