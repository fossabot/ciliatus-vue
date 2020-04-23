<template>
    <div>
        <v-list-item>
            <v-list-item-avatar>
                <v-icon><slot name="icon"> </slot></v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="title"><slot name="title"> </slot></v-list-item-title>
                <v-list-item-subtitle>
                    <slot name="subtitle"> </slot>
                    <span class="float-right"><slot name="error"> </slot></span>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider v-if="!noSeparator"> </v-divider>
    </div>
</template>

<script>
    export default {
        props: {
            noSeparator: Boolean
        }
    }
</script>
