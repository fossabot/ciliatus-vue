<script>

    import Form from "./Form";

    export default {

        extends: Form,

        data () {
            return {
                stepper: 1,
            }
        },

        methods: {
            async onSubmitStep (step) {
                if (await this.$refs['observer-step-' + step].validate()) this.stepper++
            }
        }

    }

</script>