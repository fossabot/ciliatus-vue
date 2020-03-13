<template>
    <v-card>
        <v-sheet class="border_radius_bottom_none"
                 elevation="8">
            <v-sparkline
                    :key="String(monitor.value)"
                    :smooth="16"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :line-width="1"
                    :value="monitor.history"
                    auto-draw
                    padding="16"
                    stroke-linecap="round">
            </v-sparkline>
        </v-sheet>
        <v-card-subtitle>
            <v-icon class="inline">{{ monitor.type.icon }}</v-icon>

            <span>Monitor: {{ monitor.type.name }}</span>

            <span class="float-right">{{ monitor.value }} {{ monitor.type.reading_type_symbol }}</span>

            <span class="float-right">
                <error-icon error="Data is outdated" x-small v-if="monitor.last_refresh_diff_minutes > 60"> </error-icon>
            </span>
        </v-card-subtitle>
    </v-card>
</template>

<script>
    import ErrorIcon from "../misc/ErrorIcon";
    export default {
        components: {ErrorIcon},
        props: {
            monitor: Object
        }

    }
</script>
