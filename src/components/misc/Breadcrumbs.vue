<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </div>
</template>

<script>
    import routes from "../../router/routes"

    export default {

        data () {
            return {
                breadcrumbs: []
            }
        },

        methods: {
            recomputeBreadcrumbs() {
                if (!this.$route || !this.$route.meta || !this.$route.meta.breadcrumbs) return []

                let items = [{
                    text: 'Ciliatus',
                    disabled: true
                }]

                this.$route.meta.breadcrumbs.forEach((breadcrumb) => {
                    let route = routes.filter((route) => route.name === breadcrumb)
                    if (route.length < 1) return

                    items.push({
                        text: route[0].meta.title,
                        disabled: false,
                        href: route[0].path
                    })
                })

                if (this.$route.meta.current_title) {
                    items.push({
                        text: this.$route.meta.current_title,
                        disabled: true
                    })
                }

                this.breadcrumbs = items
            }
        },

        mounted () {
            this.recomputeBreadcrumbs()

            this.$root.$on('RecomputeBreadcrumbs', () => {
                this.recomputeBreadcrumbs()
            })
        }

    }
</script>
