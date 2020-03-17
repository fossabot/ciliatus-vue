<template>
    <v-stepper-content :step="step">
        <ValidationObserver :ref="ref" v-slot="{ validate, reset }">
            <v-card class="mb-12" outlined>
                <v-card-text>
                    <slot> </slot>
                </v-card-text>
            </v-card>
            <v-btn color="primary" class="mpa-1" type="submit" @click.prevent="onSubmitStep($refs[ref])">Continue</v-btn>
            <v-btn v-if="onGoBack" class="ma-1" @click="onGoBack">Back</v-btn>
            <v-btn v-if="onSkipToEnd" class="ma-1" @click="onSkipToEnd">Skip to end</v-btn>
        </ValidationObserver>
    </v-stepper-content>
</template>

<script>

    import {ValidationObserver} from "vee-validate";

    export default {

        components: {
            ValidationObserver
        },

        props: {
            step: Number,
            observerRef: { default: 'observer-step', type: String },
            onSubmitStep: Function,
            onSkipToEnd: Function,
            onGoBack: Function
        },

        computed: {
            ref () {
                return this.observerRef + '-' + this.step
            }
        }

    }

</script>
