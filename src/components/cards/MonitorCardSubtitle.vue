<template>

    <v-card-subtitle v-if="monitor">
        <v-chip-group>
            <v-chip outlined
                    v-for="(measurement, index) in Object.keys(monitor)"
                    v-bind:data="monitor[measurement]" v-bind:key="index">
                <v-icon left>{{ monitor[measurement].type.icon }}</v-icon>
                {{ Math.round(monitor[measurement].value, 1) }}{{ monitor[measurement].type.reading_type_symbol }}
            </v-chip>
        </v-chip-group>
    </v-card-subtitle>

</template>

<script>
    export default {

        props: {
            monitor: Object
        }

    }
</script>
