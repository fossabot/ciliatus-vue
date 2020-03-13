<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="12" md="10" lg="6" xl="6" offset-md="1" offset-lg="3" offset-xl="3">
                <v-form v-model="valid" @submit.prevent="onSubmit($data)">
                    <v-stepper v-model="stepper" vertical>
                        <v-stepper-step :complete="stepper > 1" step="1">
                            Select a name and type
                        </v-stepper-step>

                        <v-stepper-content step="1">
                            <ValidationObserver ref="observer-step-1" v-slot="{ validate, reset }">
                                <v-card class="mb-12" outlined>
                                    <v-card-text>
                                        <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                                            <v-text-field outlined label="Name" v-model="form.name" :error-messages="errors"> </v-text-field>
                                        </ValidationProvider>
                                        <ValidationProvider v-slot="{ errors }" name="Type" rules="required" ref="habitat-type-validator">
                                            <autocomplete-select :value="form.habitat_type" @input="(t) => {form.habitat_type = t}"
                                                                 label="Type" title="Select a type" :error-messages="errors"
                                                                 :validator="$refs['habitat-type-validator']"
                                                                 :store-model="HabitatTypeModel"> </autocomplete-select>
                                        </ValidationProvider>
                                    </v-card-text>
                                </v-card>
                                <v-btn color="primary" type="submit" @click.prevent="onSubmitStep(1)">Continue</v-btn>
                            </ValidationObserver>
                        </v-stepper-content>

                        <v-stepper-step :complete="stepper > 2" step="2">Animals</v-stepper-step>

                        <v-stepper-content step="2">
                            <ValidationObserver ref="observer-step-2" v-slot="{ validate, reset }">
                                <v-card class="mb-12" outlined>
                                    <v-card-text>
                                        <ValidationProvider v-slot="{ errors }" name="Type" ref="animals-validator">
                                            <autocomplete-select :value="form.animals" @input="(a) => {form.animals = a}"
                                                                 label="Animal" title="Add animals" :error-messages="errors"
                                                                 :validator="$refs['animals-validator']"
                                                                 :multiple="true" :store-model="AnimalModel"> </autocomplete-select>
                                        </ValidationProvider>
                                    </v-card-text>
                                </v-card>
                                <v-btn color="primary" @click="stepper = 3">Continue</v-btn>
                                <v-btn text @click="stepper = 1">Back</v-btn>
                            </ValidationObserver>
                        </v-stepper-content>

                        <v-stepper-step :complete="stepper > 3" step="3">Sensors & Appliances</v-stepper-step>

                        <v-stepper-content step="3">
                            <ValidationObserver ref="observer-step-2" v-slot="{ validate, reset }">
                                <v-card class="mb-12" outlined>
                                    <v-card-text>
                                        <ValidationProvider v-slot="{ errors }" name="Type" ref="physical_sensors-validator">
                                            <autocomplete-select :value="form.physical_sensors" @input="(s) => {form.physical_sensors = s}"
                                                                 label="Sensor" title="Add sensors" :multiple="true"
                                                                 :error-messages="errors"
                                                                 :validator="$refs['physical_sensors-validator']"
                                                                 :store-model="PhysicalSensorModel"> </autocomplete-select>
                                        </ValidationProvider>
                                    </v-card-text>
                                    <v-card-text>
                                        <ValidationProvider v-slot="{ errors }" name="Type" ref="appliances-validator">
                                            <autocomplete-select :value="form.appliances" @input="(a) => {form.appliances = a}"
                                                                 label="Appliance" title="Add appliances" :multiple="true"
                                                                 :error-messages="errors"
                                                                 :validator="$refs['appliances-validator']"
                                                                 :store-model="ApplianceModel"> </autocomplete-select>
                                        </ValidationProvider>
                                    </v-card-text>
                                </v-card>
                                <v-btn color="primary" @click="stepper = 4">Continue</v-btn>
                                <v-btn text @click="stepper = 2">Back</v-btn>
                            </ValidationObserver>
                        </v-stepper-content>

                        <v-stepper-step step="4">Verify</v-stepper-step>

                        <v-stepper-content step="4">
                            <v-card class="mb-12" outlined v-if="stepper === 4">
                                <v-card-text>
                                    <div class="heading">Habitat</div>
                                    <div>{{ form.name }}</div>
                                    <div>{{ habitat_type.type }}</div>
                                </v-card-text>
                                <v-card-text>
                                    <div class="heading">Animals</div>
                                    <div v-for="animal in animals" :key="animal.id">
                                        {{ animal.name }}
                                        <v-alert v-if="animal.habitat_id" dense type="info">
                                            Animal will be removed from <habitat-inline :linked-object="animal.habitat" :id="animal.id"> </habitat-inline>
                                        </v-alert>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" type="submit">Save</v-btn>
                            <v-btn text @click="stepper = 3">Back</v-btn>
                        </v-stepper-content>
                    </v-stepper>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import FormActionEnum from "./FormActionEnum";
    import AutocompleteSelect from "./elements/AutocompleteSelect"
    import AnimalModel from "../../store/models/Core/AnimalModel";
    import ApplianceModel from "../../store/models/Automation/ApplianceModel";
    import HabitatModel from '../../store/models/Core/HabitatModel';
    import HabitatTypeModel from '../../store/models/Core/HabitatTypeModel';
    import PhysicalSensorModel from "../../store/models/Monitoring/PhysicalSensorModel";
    import StepperForm from "./StepperForm";
    import HabitatInline from "../inline/HabitatInline";
    import ModelFactory from "../../store/models/ModelFactory";

    export default {

        extends: StepperForm,

        components: {
            HabitatInline,
            AutocompleteSelect
        },

        data () {
            return {
                HabitatTypeModel: HabitatTypeModel,
                AnimalModel: AnimalModel,
                PhysicalSensorModel: PhysicalSensorModel,
                ApplianceModel: ApplianceModel,
                submit: {
                    entity: HabitatModel.entity,
                    action: FormActionEnum.CREATE
                },
                form: {
                    name: null,
                    habitat_type: null,
                    animals: [],
                    physical_sensors: [],
                    appliances: []
                },
                validation: {
                    name: 'required',
                    habitat_type: 'required'
                }
            }
        },

        computed: {
            animalIds () {
                return this.form.animals
            },
            animals () {
                return AnimalModel.query().with('habitat').whereIdIn(this.animalIds).get()
            },
            habitat_type () {
                return HabitatTypeModel.find(this.form.habitat_type)
            }
        },

        watch: {
            animalIds () {
                ModelFactory.fetchMultiple(AnimalModel, this.form.animals)
            }
        }

    }

</script>
