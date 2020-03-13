<template>
    <v-skeleton-loader v-if="!objects" transition="fade-transitions" height="400" type="table">
    </v-skeleton-loader>
    <v-card v-else outlined>
        <error-alert v-if="error" :error="error"></error-alert>

        <v-card-title>
            Sensors
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    @keydown="updateSearch"> </v-text-field>
        </v-card-title>

        <v-data-table
                show-expand
                :single-expand="false"
                :expanded.sync="expanded"
                item-key="id"
                :loading="loading"
                :headers="headers"
                :items="objects"
                :items-per-page.sync="pagination.per_page"
                :server-items-length="pagination.total_items"
                :search="search"
                @update:page="updatePage"
                @update:sort-by="updateSortBy"
                @update:sort-desc="updateSortDesc"
                @update:items-per-page="updatePage">
            <template v-slot:item.icon="{ item }">
                <v-icon>{{ item.icon }}</v-icon>
            </template>
            <template v-slot:item.name="{ item } ">
                <a :href="'/sensors/' + item.id">{{ item.name }}</a>
            </template>
            <template v-slot:item.belongsToModel="{ item }">
                <inline-habitat v-if="item.belongsToModel_entity === 'habitats'" :id="item.belongsToModel_id"> </inline-habitat>
            </template>
            <template v-slot:expanded-item="{ item }" style="box-shadow: none">
                <td colspan="7" class="ma-0 pa-0" v-if="item.logical_sensors.length > 0">
                    <v-simple-table class="custom--expanded-table">
                        <tbody>
                        <tr v-for="ls in item.logical_sensors" v-bind:data="ls" v-bind:key="ls.id">
                            <td class="custom--expanded-row-first-col"><v-icon>{{ ls.icon }}</v-icon></td>
                            <td>
                                {{ ls.name }} -
                                {{ ls.type.reading_type_name }} {{ ls.type.reading_type_unit }} -
                                {{ ls.current_reading_corrected }}{{ ls.type.reading_type_symbol }} ({{ ls.reading_correction }})
                            </td>
                        </tr>
                        </tbody>
                    </v-simple-table>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import DataTable from "./DataTable"
    import ErrorAlert from "../misc/ErrorAlert"
    import InlineHabitat from "../inline/HabitatInline"
    import InlineLocation from "../inline/LocationInline"
    import PhysicalSensorModel from "../../store/models/Monitoring/PhysicalSensorModel"

    export default {

        extends: DataTable,

        components: {
            ErrorAlert, InlineHabitat, InlineLocation
        },

        data () {
            return {
                model: PhysicalSensorModel,
                expanded: [],
                headers_default: [
                    {
                        text: '',
                        value: 'icon',
                        width: 80
                    },
                    {
                        text: 'Name', //@TODO: Translate
                        value: 'name',
                    },
                    {
                        text: 'Vendor', //@TODO: Translate
                        value: 'type.vendor',
                        sortable: false,
                        filterable: true
                    },
                    {
                        text: 'Model', //@TODO: Translate
                        value: 'type.model',
                        sortable: false,
                        filterable: true
                    },
                    {
                        text: 'Protocol', //@TODO: Translate
                        value: 'type.protocol',
                        sortable: false,
                        filterable: true
                    },
                    {
                        text: 'Belongs To', //@TODO: Translate
                        value: 'belongsToModel',
                        sortable: false,
                        filterable: true
                    },
                    { text: '', value: 'data-table-expand' },
                ],
                search_mapping: {
                    model: 'type.model',
                    vendor: 'type.vendor',
                    protocol: 'type.protocol'
                }
            }
        }

    }

</script>
