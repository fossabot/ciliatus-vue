<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else :loading="loading" :class="card_state">
        <card-title v-if="object" :no-separator="true">
            <template v-slot:icon>{{ object._icon }}</template>
            <template v-slot:title>
                {{ object.name }}
                <error-icon v-if="object.state === 'error'" :error="object.state_text"> </error-icon>
            </template>
            <template v-slot:subtitle>
                Appliance: {{ object.type.name }}
                <v-tooltip top v-for="(capability, index) in object.type.capabilities"
                               v-bind:data="capability" v-bind:key="capability.id">
                    <template v-slot:activator="{ on }" >
                        <v-icon class="ml-1" v-on="on">{{ capability._icon }}</v-icon>
                    </template>
                    <span>{{ capability.name }}</span>
                </v-tooltip>
            </template>
        </card-title>

        <v-card-actions v-if="!noActions">
            <v-spacer />

            <v-btn icon @click="refresh()">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import CardTitle from "../CardTitle"
    import SingleComponent from "../../SingleComponent"
    import ModelFactory from "../../../store/models/ModelFactory"
    import ApplianceModel from "../../../store/models/Automation/ApplianceModel"
    import ErrorIcon from "../../misc/ErrorIcon"

    export default {
        extends: SingleComponent,

        components: {
           CardTitle, ErrorIcon
        },

        data () {
            return {
                model: ApplianceModel
            }
        },

        computed: {
            card_state () {
                switch (this.object.state) {
                    case 'active':
                        return 'border-active';
                    case 'inactive':
                        return 'border-inactive';
                    case 'error':
                        return 'border-error';
                    case 'unknown':
                        return 'border-unknown';
                }
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.id, this.model.getRelationNames())
            }
        }
    }
</script>
