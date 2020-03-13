<template>
    <v-skeleton-loader v-if="!object" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-list-item v-else @click="" :to="'appliances/' + object.id" :class="card_state">
        <v-list-item-icon>
            <v-icon small v-if="first">{{ object._icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ object.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="object.type">
                {{ object.type.name }}
                <v-tooltip top v-for="(capability, index) in object.type.capabilities"
                           v-bind:data="capability" v-bind:key="capability.id">
                    <template v-slot:activator="{ on }" >
                        <v-icon small class="ml-1" v-on="on">{{ capability._icon }}</v-icon>
                    </template>
                    <span>{{ capability.name }}</span>
                </v-tooltip>
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <error-icon v-if="object.state === 'error'" :error="object.state_text"> </error-icon>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
    import PassiveSingleComponent from "../../PassiveSingleComponent"
    import ErrorIcon from "../../misc/ErrorIcon";
    import ApplianceModel from "../../../store/models/Automation/ApplianceModel"

    export default {
        components: {ErrorIcon},
        extends: PassiveSingleComponent,

        props: {
            first: Boolean
        },

        computed: {
            card_state () {
                switch (this.object.state) {
                    case 'active':
                        return 'border-ok';
                    case 'inactive':
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
                model: ApplianceModel
            }
        }
    }
</script>
