<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list v-else-if="object.length > 0" dense>
        <workflow-action-list-item
                v-for="(action, index) in object"
                v-bind:data="action" v-bind:key="action.id"
                :linked-object="action"
                :first="index === 0 || !iconOnlyFirst">
        </workflow-action-list-item>
    </v-list>
</template>

<script>
    import PassiveSingleComponent from "../PassiveSingleComponent"
    import WorkflowActionListItem from "./items/WorkflowActionListItem"
    import WorkflowModel from "../../store/models/Automation/WorkflowModel"

    export default {
        extends: PassiveSingleComponent,

        props: {
            iconOnlyFirst: Boolean
        },

        data () {
            return {
                model: WorkflowModel
            }
        },

        components: {
            WorkflowActionListItem
        }
    }
</script>
