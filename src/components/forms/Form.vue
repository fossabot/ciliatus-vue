<script>

    import axios from "axios";
    import JSONBigInt from "json-bigint";
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate"
    import { required, min, email } from 'vee-validate/dist/rules'
    import config from "../../config"
    import ErrorParser from "../../util/ErrorParser"

    setInteractionMode('eager')

    extend('required', {...required})
    extend('min', {...min})
    extend('email', {...email})

    export default {

        components: {
            ValidationProvider,
            ValidationObserver
        },

        data () {
            return {
                redirect: {
                    success: null,
                    error: null
                },
                submit: {
                    entity: null,
                    action: null,
                    url_override: null
                },
                event: {
                    submit: this.onSubmit,
                    error: this.onError
                },
                validation: {
                    ref: '_form'
                },
                package: 'core',
                valid: false,
                form: {}
            }
        },

        computed: {
            url () {
                return this.submit.url_override ? this.submit.url_override : config.api.basePath + config.api.prefix + this.package + '/' + this.submit.entity
            }
        },

        methods: {
            async onSubmit () {
                // If we have a stepper form, wie expect the form to be validated
                let valid = this.stepper != null ? true : await this.$refs[this.validation._ref].validate()
                if (!valid) return

                axios[this.submit.action](this.url, this.form, {
                    transformResponse: [data => data]
                }).then((response) => {
                    if (this.redirect.success != null) {
                        if (typeof this.redirect.success === "function") this.redirect.success()
                        else window.location.href = this.redirect.success
                    }

                    let resp = JSONBigInt.parse(response.data)
                    if (resp.length > 0) {
                        window.location.href = resp[0]._self
                    }
                }).catch((error) => {
                    this.event.error(ErrorParser.parse(error))
                })
            },

            onError (error) {
                if (this.redirect.error != null) {
                    if (typeof this.redirect.error === "function") this.redirect.error()
                    else window.location.href = this.redirect.error
                }

                this.$toast.error(error)
            }
        }

    }

</script>
