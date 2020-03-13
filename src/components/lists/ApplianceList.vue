<template>
    <v-skeleton-loader v-if="!object.appliances" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list v-else dense>
        <appliance-list-item
                v-for="(appliance, index) in object.appliances"
                v-bind:data="appliance" v-bind:key="appliance.id"
                :linked-object="appliance"
                :first="index === 0 || !iconOnlyFirst">
        </appliance-list-item>
    </v-list>
</template>

<script>
    import PassiveSingleComponent from "../PassiveSingleComponent"
    import ApplianceListItem from "./items/ApplianceListItem"
    import ApplianceGroupModel from "../../store/models/Automation/ApplianceGroupModel"

    export default {
        extends: PassiveSingleComponent,

        props: {
            iconOnlyFirst: Boolean
        },

        data () {
            return {
                model: ApplianceGroupModel
            }
        },

        components: {
            ApplianceListItem
        }
    }
</script>
