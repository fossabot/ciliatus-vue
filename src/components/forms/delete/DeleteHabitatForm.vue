<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="12" md="10" lg="6" xl="6" offset-md="1" offset-lg="3" offset-xl="3">
                <v-skeleton-loader v-if="!ready" type="form"> </v-skeleton-loader>
                <v-form v-else @submit.prevent="onSubmit($data)">
                    <v-card class="mb-12" outlined>
                        <v-card-title>Delete {{ object.name }}</v-card-title>
                        <v-card-text>
                            <template v-if="object.animals.length > 0">
                                <div v-for="animal in object.animals" :key="animal.id">
                                    <v-alert v-if="animal.habitat_id" border="left" colored-border color="warning">
                                        Animal <animal-inline :linked-object="animal" :id="animal.id"> </animal-inline>
                                        will be removed from <habitat-inline :linked-object="object" :id="object.id"> </habitat-inline>
                                    </v-alert>
                                </div>
                            </template>
                            <template v-else>
                                <v-icon color="success">mdi-check</v-icon> Everything looks good.
                            </template>
                        </v-card-text>
                    </v-card>
                    <v-btn color="primary" class="ma-1" type="error">Delete</v-btn>
                    <v-btn class="ma-1" @click="$router.back()">Cancel</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import FormActionEnum from "../FormActionEnum"
    import AnimalInline from "../../inline/AnimalInline"
    import HabitatInline from "../../inline/HabitatInline"
    import HabitatModel from '../../../store/models/Core/HabitatModel'
    import Form from "../Form";
    import ModelFactory from "../../../store/models/ModelFactory";
    import Link from "../../../util/Link";

    export default {

        extends: Form,

        components: {
            HabitatInline, AnimalInline
        },

        props: {
            id: Number
        },

        data () {
            return {
                submit: {
                    entity: HabitatModel.entity + '/' + this.id,
                    action: FormActionEnum.DELETE
                },
                redirect: {
                    success: Link.link('habitats')
                },
                form: {},
                validation: {},
                ready: false
            }
        },

        computed: {
            object () {
                return HabitatModel.query().withAllRecursive().find(this.id)
            }
        },

        mounted () {
            ModelFactory.fetch(HabitatModel, this.id, (r, ids) => {
                this.ready = true
                this.$root.$emit('RecomputeBreadcrumbs')
            })
        }

    }

</script>
