<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <card-title v-if="object">
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>
                Workflow
                <v-tooltip top v-for="(capability, index) in object.capabilities"
                           v-bind:data="capability" v-bind:key="capability.id">
                    <template v-slot:activator="{ on }" >
                        <v-icon class="ml-1" v-on="on">{{ capability._icon }}</v-icon>
                    </template>
                    <span>{{ capability.name }}</span>
                </v-tooltip>
            </template>
        </card-title>

        <workflow-action-list v-if="object.actions" :icon-only-first="false" :linked-object="object.actions"> </workflow-action-list>

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
    import WorkflowActionList from "../../lists/WorkflowActionList"
    import WorkflowModel from "../../../store/models/Automation/WorkflowModel"

    export default {
        extends: SingleComponent,

        components: {
            WorkflowActionList, CardTitle
        },

        data () {
            return {
                model: WorkflowModel
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.id, this.model.getRelationNames())
            }
        }
    }
</script>
