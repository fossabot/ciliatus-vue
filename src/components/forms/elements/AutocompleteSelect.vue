<template>

    <v-autocomplete
            v-if="model"
            v-model="search_model"
            :loading="loading"
            :items="objects"
            :item-text="search_field"
            item-value="id"
            :label="label"
            :search-input.sync="search_str"
            @change="onChange"
            clearable
            no-filter
            :multiple="multiple"
            :error-messages="errorMessages"
            solo>
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                    No results
                </v-list-item-title>
            </v-list-item>
        </template>
        <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip v-if="item"
                    v-bind="attr"
                    :input-value="selected"
                    v-on="on">
                <v-icon left>mdi-coin</v-icon>
                <span v-text="item[search_field]"> </span>
            </v-chip>
        </template>
        <template v-slot:item="{ item }">
            <v-list-item-avatar
                    color="indigo"
                    class="headline font-weight-light white--text"
            >
                {{ item.name.charAt(0) }}
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-text="item.name"> </v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"> </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-icon>mdi-coin</v-icon>
            </v-list-item-action>
        </template>
    </v-autocomplete>

</template>

<script>

    import Autocomplete from "./Autocomplete";

    export default {

        extends: Autocomplete,

        props: {
            label: String,
            title: String,
            multiple: Boolean,
            errorMessages: Array,
            validator: Object,
            default: Number|Array
        },

        methods: {
            async onChange (e) {
                this.search_str = null
                this.validator.syncValue(e)
                await this.validator.validate()

                this.validator.setFlags({
                    dirty: true,
                    pristine: false
                })
                this.$emit('input', e)
            },

            onSuggestionsUpdated () {
                if (this.initial && this.default) {
                    this.search_model = this.default
                }
            }
        },

        created () {
            this.pushUpdateCallback(this.onSuggestionsUpdated)
        }
    }

</script>
