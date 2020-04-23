<template>
    <v-skeleton-loader v-if="!monitor" transition="fade-transitions" height="120" type="card">
    </v-skeleton-loader>
    <v-card v-else>
        <card-title>
            <template v-slot:icon>{{ monitor.type.icon }}</template>
            <template v-slot:title>Monitor: {{ monitor.type.name }}</template>
            <template v-slot:subtitle>{{ monitor.value }} {{ monitor.type.reading_type_symbol }}</template>
            <template v-slot:error><error-icon error="Data is outdated" x-small v-if="monitor.last_refresh_diff_minutes > 60"> </error-icon></template>
        </card-title>

        <v-card-text>
            <v-sparkline
                    :key="String(monitor.value)"
                    :smooth="8"
                    :gradient="['#42b3f4']"
                    :line-width="0.8"
                    :value="monitor.history"
                    auto-draw
                    padding="16"
                    stroke-linecap="round">
            </v-sparkline>
        </v-card-text>
    </v-card>
</template>

<script>

    import ErrorIcon from "../misc/ErrorIcon"
    import CardTitle from "./CardTitle"

    export default {

        components: {
            ErrorIcon, CardTitle
        },

        props: {
            monitor: Object
        }

    }
</script>
