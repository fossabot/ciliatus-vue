<template>
    <v-container>
        <error-alert v-if="error" :error="error"></error-alert>

        <v-row align="start" v-if="initial">
            <v-col sm="12" md="6" lg="4" xl="3" v-for="n in pagination.items" :key="n">
                <v-skeleton-loader type="article, actions"> </v-skeleton-loader>
            </v-col>
        </v-row>

        <template v-else>
            <v-masonry>
                <v-masonry-tile v-for="a in objects" v-bind:data="a" v-bind:key="a.id">
                    <animal :id="a.id" :no-initial-load="true"> </animal>
                </v-masonry-tile>
            </v-masonry>

            <v-row align="start" v-if="!error">
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
    import Animal from "../cards/full/AnimalFullCard"
    import AnimalModel from "../../store/models/Core/AnimalModel"
    import HabitatModel from "../../store/models/Core/HabitatModel";

    export default {

        extends: PaginatedComponent,

        components: {
            ErrorAlert, Animal
        },

        data () {
            return {
                model: AnimalModel,
                relations: [ 'habitat' ]
            }
        }

    }
</script>
