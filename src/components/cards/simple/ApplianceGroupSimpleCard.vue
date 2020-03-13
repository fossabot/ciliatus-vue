<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading">
        <card-title v-if="object">
            <template v-slot:icon>mdi-animation-play-outline</template>
            <template v-slot:title>{{ object.name }}</template>
            <template v-slot:subtitle>
                Appliance Group
                <span v-if="object.is_builtin" class="overline float-right">builtin</span>
                <v-tooltip top v-for="(capability, index) in object.capabilities"
                           v-bind:data="capability" v-bind:key="capability.id">
                    <template v-slot:activator="{ on }" >
                        <v-icon class="ml-1" v-on="on">{{ capability._icon }}</v-icon>
                    </template>
                    <span>{{ capability.name }}</span>
                </v-tooltip>
            </template>
        </card-title>

        <appliance-list v-if="object.appliances" :icon-only-first="false" :linked-object="object"> </appliance-list>

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
    import ApplianceGroupModel from "../../../store/models/Automation/ApplianceGroupModel"
    import ApplianceList from "../../lists/ApplianceList"

    export default {
        extends: SingleComponent,

        components: {
            ApplianceList, CardTitle
        },

        data () {
            return {
                model: ApplianceGroupModel
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.id, 'logical_sensors')
            }
        }
    }
</script>
