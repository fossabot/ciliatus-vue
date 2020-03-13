<template>
    <v-container>
        <error-alert v-if="error" :error="error"></error-alert>

        <v-row v-if="initial">
            <v-col sm="12" md="6" lg="4" xl="3" v-for="n in pagination.items" :key="n">
                <v-skeleton-loader type="article, actions"> </v-skeleton-loader>
            </v-col>
        </v-row>

        <template v-else>
            <v-masonry item-selector=".habitat">
                <v-row>
                    <v-masonry-tile v-for="habitat in objects" :key="habitat.id" item-selector="habitat">
                        <habitat-full-card :id="habitat.id" :no-initial-load="true"> </habitat-full-card>
                    </v-masonry-tile>
                </v-row>
            </v-masonry>

            <v-row v-if="!error">
                <v-col sm="12">
                    <a @click="loadMore">Load more</a>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
    import PaginatedComponent from "../PaginatedComponent"
    import ErrorAlert from "../misc/ErrorAlert"
    import HabitatFullCard from "../cards/full/HabitatFullCard"
    import HabitatModel from "../../store/models/Core/HabitatModel"

    export default {

        extends: PaginatedComponent,

        components: {
            ErrorAlert, HabitatFullCard
        },

        props: {
            filter: Object
        },

        data () {
            return {
                model: HabitatModel,
                relations: [ 'animals' ]
            }
        }

    }

</script>
