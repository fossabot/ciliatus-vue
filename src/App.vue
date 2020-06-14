<template>
    <v-app id="ciliatus">
        <v-app-bar app clipped-left color="primary">
            <v-app-bar-nav-icon @click="drawer = !drawer"/>
            <!--<v-img src="/img/logo.svg" max-height="30" max-width="30" contain />-->
            <span class="title ml-3 mr-5">Test</span>

            <v-spacer/>

            <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"/>

            <v-spacer/>

            <v-menu left bottom offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <template v-if="user">
                        <v-list-item>
                            <v-list-item-action>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>{{ user.name }}</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="$router.push('settings')">
                            <v-list-item-action>
                                <v-icon>info</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>Settings</v-list-item-title>
                        </v-list-item>

                        <v-list-item @click="$router.push('logout')">
                            <v-list-item-action>
                                <v-icon>info</v-icon>
                            </v-list-item-action>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </template>

                    <v-divider> </v-divider>

                    <v-list-item @click="toggleNightMode">
                        <v-list-item-action>
                            <v-icon>help</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Toggle Dark Mode</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>help</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>Help</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>info</v-icon>
                        </v-list-item-action>
                        <v-list-item-title>About</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <template v-for="(item, i) in items">
                    <v-list-item :key="i" :to="{path: item.to}">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="grey--text">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <loader> </loader>
            <v-dialog v-model="error_dialog" width="unset">
                <v-card>
                    <v-card-title>Something went wrong</v-card-title>
                    <v-card-text>
                        <v-alert v-for="error in active_errors" border="left" colored-border :color="error.severity">
                            {{ error.message }}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer> </v-spacer>
                        <v-btn color="primary" ext @click="error_dialog = false">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-container fluid>
                <breadcrumbs> </breadcrumbs>
                <router-view> </router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import scss from "./assets/custom.scss"
    import routes from "./router/routes"
    import Breadcrumbs from "./components/misc/Breadcrumbs"
    import Loader from "./components/misc/Loader"
    import axios from "axios";
    import Link from "./util/Link";
    import router from "./router";
    import JSONBigInt from "json-bigint";

    export default {
        props: {
            source: String,
        },

        components: {
            Breadcrumbs, Loader
        },

        data () {
            return {
                error_dialog: false,
                active_errors: [],
                route: {
                    prev: null
                },
                user: null,
                drawer: null,
                items: routes.filter(item => item.menu)
                    .map((r) => {
                        return {to: r.path, icon: r.icon, text: r.meta.title}
                    })
            }
        },

        methods: {
            toggleNightMode () {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            },
            goPrev (fallback = '/') {
                if (this.route.prev) this.$router.push(this.route.prev)
                this.$router.push(fallback)
            },
            checkAuth () {
                axios.get(Link.api('auth/check'), {
                    transformResponse: [data => data]
                }).then((response) => {
                    this.user = JSONBigInt.parse(response.data).data
                }, (error) => {
                    if (!error.response) return
                    if (error.response.status === 401 && router.currentRoute.name !== 'login') {
                        router.push('/web/login')
                    }
                })
            }
        },

        created () {
            this.checkAuth()

            this.$router.beforeEach((to, from, next) => {
                this.checkAuth()
                this.route.prev = from

                next()
            })

            this.$root.$on('ErrorsFlashed', (errors, popup = true) => {
                this.active_errors = errors
                this.error_dialog = popup
            })
        }

    }
</script>
