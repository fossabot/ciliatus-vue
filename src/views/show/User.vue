<template>
    <v-container>
        <user :on-initial-load-done="onInitialDone" :id="id"> </user>
    </v-container>
</template>

<script>
    import ShowView from "./ShowView"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import UserModel from "../../store/models/Common/UserModel"
    import User from "../../components/app/User"

    export default {
        extends: ShowView,

        data () {
            return {
                model: UserModel
            }
        },

        components: {
            User
        },

        computed: {
            object () {
                return HabitatModel.query().with('settings').find(this.id)
            }
        },

        mounted () {
            this.$root.$emit('ResetLoading', 1)
        }
    }
</script>
