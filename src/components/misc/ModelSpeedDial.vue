<template>
    <v-speed-dial v-model="fab" bottom right fixed
                  direction="top" transition="slide-y-reverse-transition">
        <template v-slot:activator>
            <v-btn v-model="fab" fab :color="fab ? 'normal' : 'primary'">
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-btn fab small v-show="del" color="error" :href="model.view('del')">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn fab small v-show="edit" color="warning" :href="model.view('edit')">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab small v-show="create" color="success" :href="model.view('create')">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {

        props: {
            create: Boolean,
            edit: Boolean,
            del: Boolean,
            model: Object|Function,
            id: Number
        },

        data () {
            return {
                fab: false
            }
        },

        created() {
            window.console.log(this.model.view('create'))
        }

    }
</script>
