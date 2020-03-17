<script>

    import Form from "./Form";

    export default {

        extends: Form,

        data () {
            return {
                stepper: 1,
                steps: null
            }
        },

        methods: {
            onGoBack () {
                this.stepper--
            },
            onSkipToEnd () {
                this.stepper = this.steps
            },
            async onSubmitStep (ref) {
                if (await ref.validate()) this.stepper++
            }
        }

    }

</script>
