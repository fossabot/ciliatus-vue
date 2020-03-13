<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list-item v-else @click="" :to="'workflows/' + object.workflow_id">
        <v-list-item-icon>
            <v-icon small v-if="first">{{ object.appliance._icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ object.name }}</v-list-item-title>
            <v-list-item-subtitle>
                <v-icon class="inline" x-small>{{ object.state._icon }}</v-icon>
                {{ object.state.name }}
                <span v-if="object.state.has_level">
                    - to {{ object.target_level }}
                    <span v-if="object.target_level_rampup_seconds">
                        over {{ parseInt(object.target_level_rampup_seconds) }}s
                    </span>
                </span>

            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            +{{ object.workflow_time_offset_seconds }}s
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import PassiveSingleComponent from "../../PassiveSingleComponent"
    import ErrorIcon from "../../misc/ErrorIcon"
    import WorkflowActionModel from "../../../store/models/Automation/WorkflowActionModel"

    export default {
        components: {ErrorIcon},
        extends: PassiveSingleComponent,

        props: {
            first: Boolean
        },

        data () {
            return {
                model: WorkflowActionModel
            }
        }
    }
</script>
