<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="12" md="10" lg="6" xl="6" offset-md="1" offset-lg="3" offset-xl="3">
                <v-form v-model="valid" @submit.prevent="onSubmit($data)">
                    <v-stepper v-model="stepper" vertical>
                        <v-stepper-step :complete="stepper > 1" step="1">
                            Select a name and type
                        </v-stepper-step>

                        <stepper-form-step :step="1" :on-submit-step="onSubmitStep">
                            <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                                <v-text-field outlined label="Name" v-model="form.name" :error-messages="errors"> </v-text-field>
                            </ValidationProvider>

                            <ValidationProvider v-slot="{ errors }" name="Type" rules="required" ref="habitat-type-validator">
                                <autocomplete-select :value="form.relations.habitat_type" @input="(t) => {form.relations.habitat_type = t}"
                                                     label="Type" title="Select a type" :error-messages="errors"
                                                     :validator="$refs['habitat-type-validator']"
                                                     :store-model="HabitatTypeModel"> </autocomplete-select>
                            </ValidationProvider>

                            <ValidationProvider v-slot="{ errors }" name="Location" rules="required" ref="location-validator">
                                <autocomplete-select :value="form.relations.location" @input="(t) => {form.relations.location = t}"
                                                     label="Location" title="Select a Location" :error-messages="errors"
                                                     :validator="$refs['location-validator']"
                                                     :store-model="LocationModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>

                        <v-stepper-step :complete="stepper > 2" step="2">Animals</v-stepper-step>

                        <stepper-form-step :step="2" :on-submit-step="onSubmitStep" :on-go-back="onGoBack" :on-skip-to-end="onSkipToEnd">
                            <ValidationProvider v-slot="{ errors }" name="Type" ref="animals-validator">
                                <autocomplete-select :value="form.relations.animals" @input="(a) => {form.relations.animals = a}"
                                                     label="Animal" title="Add animals" :error-messages="errors"
                                                     :validator="$refs['animals-validator']"
                                                     :multiple="true" :store-model="AnimalModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>

                        <v-stepper-step :complete="stepper > 3" step="3">Sensors & Appliances</v-stepper-step>

                        <stepper-form-step :step="3" :on-submit-step="onSubmitStep" :on-go-back="onGoBack" :on-skip-to-end="onSkipToEnd">
                            <ValidationProvider v-slot="{ errors }" name="Type" ref="physical_sensors-validator">
                                <autocomplete-select :value="form.relations.physical_sensors" @input="(s) => {form.relations.physical_sensors = s}"
                                                     label="Sensor" title="Add sensors" :multiple="true"
                                                     :error-messages="errors"
                                                     :validator="$refs['physical_sensors-validator']"
                                                     :store-model="PhysicalSensorModel"> </autocomplete-select>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Type" ref="appliances-validator">
                                <autocomplete-select :value="form.relations.appliances" @input="(a) => {form.relations.appliances = a}"
                                                     label="Appliance" title="Add appliances" :multiple="true"
                                                     :error-messages="errors"
                                                     :validator="$refs['appliances-validator']"
                                                     :store-model="ApplianceModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>

                        <v-stepper-step step="4">Verify</v-stepper-step>

                        <stepper-form-finish :step="4" :on-go-back="onGoBack">
                            <template v-if="stepper === 4">
                                <div class="heading">Habitat</div>
                                <div>{{ form.name }}</div>
                                <div>{{ habitat_type.type }}</div>

                                <div class="heading">Animals</div>
                                <div v-for="animal in animals" :key="animal.id">
                                    {{ animal.name }}
                                    <v-alert v-if="animal.habitat_id" dense type="info">
                                        Animal will be removed from <habitat-inline :linked-object="animal.habitat" :id="animal.id"> </habitat-inline>
                                    </v-alert>
                                </div>
                            </template>
                        </stepper-form-finish>
                    </v-stepper>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import FormActionEnum from "../FormActionEnum";
    import AutocompleteSelect from "../elements/AutocompleteSelect"
    import AnimalModel from "../../../store/models/Core/AnimalModel";
    import ApplianceModel from "../../../store/models/Automation/ApplianceModel";
    import HabitatModel from '../../../store/models/Core/HabitatModel';
    import HabitatTypeModel from '../../../store/models/Core/HabitatTypeModel';
    import PhysicalSensorModel from "../../../store/models/Monitoring/PhysicalSensorModel";
    import StepperForm from "../StepperForm";
    import HabitatInline from "../../inline/HabitatInline";
    import ModelFactory from "../../../store/models/ModelFactory";
    import StepperFormStep from "../StepperFormStep";
    import StepperFormFinish from "../StepperFormFinish";
    import LocationModel from "../../../store/models/Core/LocationModel";

    export default {

        extends: StepperForm,

        components: {
            StepperFormStep, StepperFormFinish,
            HabitatInline,
            AutocompleteSelect
        },

        data () {
            return {
                HabitatTypeModel: HabitatTypeModel,
                AnimalModel: AnimalModel,
                PhysicalSensorModel: PhysicalSensorModel,
                ApplianceModel: ApplianceModel,
                LocationModel: LocationModel,
                submit: {
                    entity: HabitatModel.entity,
                    action: FormActionEnum.CREATE
                },
                form: {
                    name: null,
                    relations: {
                        habitat_type: null,
                        location: null,
                        animals: [],
                        physical_sensors: [],
                        appliances: []
                    }
                },
                validation: {
                    name: 'required',
                    habitat_type: 'required'
                },
                steps: 4
            }
        },

        computed: {
            animalIds () {
                return this.form.relations.animals
            },
            animals () {
                return AnimalModel.query().with('habitat').whereIdIn(this.animalIds).get()
            },
            habitat_type () {
                return HabitatTypeModel.find(this.form.relations.habitat_type)
            }
        },

        watch: {
            animalIds () {
                ModelFactory.fetchMultiple(AnimalModel, this.form.relations.animals)
            }
        }

    }

</script>
