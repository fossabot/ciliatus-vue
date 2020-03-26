<script>
    import View from "../View"

    export default {
        extends: View,

        data () {
            return {
                id: null
            }
        },

        watch: {
            object (value) {
                this.setTitle("Edit " + this.object.name)
            }
        },

        mounted () {
            if (this.object) this.setTitle(this.object.name)
            else this.setTitle('...')
        },

        created () {
            this.id = parseInt(this.$route.params.id)
        }

    }
</script>
