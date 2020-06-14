<template>
    <v-container>
        <v-row>
            <v-col xs="12" sm="12" md="10" lg="6" xl="6" offset-md="1" offset-lg="3" offset-xl="3">
                <v-form v-model="valid" @submit.prevent="onSubmit($data)">
                    <v-stepper v-model="stepper" vertical>
                        <v-stepper-step :complete="stepper > 1" step="1">Select a name and type</v-stepper-step>
                        <stepper-form-step :step="1" :on-submit-step="onSubmitStep">
                            <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                                <v-text-field outlined label="Name" v-model="form.name" :error-messages="errors"> </v-text-field>
                            </ValidationProvider>

                            <v-skeleton-loader type="autocomplete3" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Type" rules="required" ref="habitat-type-validator" v-else>
                                <autocomplete-select :default="form.relations.habitat_type" @input="(t) => {form.relations.habitat_type = t}"
                                                     label="Type" title="Select a type" :error-messages="errors"
                                                     :validator="$refs['habitat-type-validator']"
                                                     :store-model="HabitatTypeModel"> </autocomplete-select>
                            </ValidationProvider>

                            <v-skeleton-loader type="autocomplete" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Location" rules="required" ref="location-validator" v-else>
                                <autocomplete-select :default="form.relations.location" @input="(t) => {form.relations.location = t}"
                                                     label="Location" title="Select a Location" :error-messages="errors"
                                                     :validator="$refs['location-validator']"
                                                     :store-model="LocationModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>


                        <v-stepper-step :complete="stepper > 2" step="2">Animals</v-stepper-step>
                        <stepper-form-step :step="2" :on-submit-step="onSubmitStep" :on-go-back="onGoBack" :on-skip-to-end="onSkipToEnd">
                            <v-skeleton-loader type="autocomplete" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Animals" ref="animals-validator" v-else>
                                <autocomplete-select :default="form.relations.animals" @input="(a) => {form.relations.animals = a}"
                                                     label="Animals" title="Add animals" :multiple="true"
                                                     :error-messages="errors"
                                                     :validator="$refs['animals-validator']"
                                                     :store-model="AnimalModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>


                        <v-stepper-step :complete="stepper > 3" step="3">Sensors & Appliances</v-stepper-step>
                        <stepper-form-step :step="3" :on-submit-step="onSubmitStep" :on-go-back="onGoBack" :on-skip-to-end="onSkipToEnd">
                            <v-skeleton-loader type="autocomplete" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Sensors" ref="physical_sensors-validator" v-else>
                                <autocomplete-select :default="form.relations.physical_sensors" @input="(s) => {form.relations.physical_sensors = s}"
                                                     label="Sensors" title="Add Sensors" :multiple="true"
                                                     :error-messages="errors"
                                                     :validator="$refs['physical_sensors-validator']"
                                                     :store-model="PhysicalSensorModel"> </autocomplete-select>
                            </ValidationProvider>

                            <v-skeleton-loader type="autocomplete" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Appliances" ref="appliances-validator" v-else>
                                <autocomplete-select :default="form.relations.appliances" @input="(a) => {form.relations.appliances = a}"
                                                     label="Appliances" title="Add appliances" :multiple="true"
                                                     :error-messages="errors"
                                                     :validator="$refs['appliances-validator']"
                                                     :store-model="ApplianceModel"> </autocomplete-select>
                            </ValidationProvider>

                            <v-skeleton-loader type="autocomplete" v-if="!ready"> </v-skeleton-loader>
                            <ValidationProvider v-slot="{ errors }" name="Appliance Groups" ref="appliance_groups-validator" v-else>
                                <autocomplete-select :default="form.relations.appliance_groups" @input="(a) => {form.relations.appliance_groups = a}"
                                                     label="Appliance Groups" title="Add Appliance Groups" :multiple="true"
                                                     :error-messages="errors" :filter="{is_builtin:'false'}"
                                                     :validator="$refs['appliance_groups-validator']"
                                                     :store-model="ApplianceGroupModel"> </autocomplete-select>
                            </ValidationProvider>
                        </stepper-form-step>


                        <v-stepper-step step="4">Verify</v-stepper-step>
                        <stepper-form-finish :step="4" :on-go-back="onGoBack">
                            <template v-if="stepper === 4">
                                <template v-if="animals.filter((a) => a.habitat_id !== id).length > 0">
                                    <div v-for="animal in animals.filter((a) => a.habitat_id !== id)" :key="animal.id">
                                        <v-alert v-if="animal.habitat_id" border="left" colored-border color="warning">
                                            Animal <animal-inline :linked-object="animal" :id="animal.id"> </animal-inline>
                                            will be removed from <habitat-inline :linked-object="animal.habitat" :id="animal.habitat_id"> </habitat-inline>
                                        </v-alert>
                                    </div>
                                </template>
                                <template v-else>
                                    <v-icon color="success">mdi-check</v-icon> Everything looks good.
                                </template>
                            </template>
                        </stepper-form-finish>
                    </v-stepper>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    import FormActionEnum from "../FormActionEnum"
    import AutocompleteSelect from "../elements/AutocompleteSelect"
    import AnimalInline from "../../inline/AnimalInline"
    import HabitatInline from "../../inline/HabitatInline"
    import AnimalModel from "../../../store/models/Core/AnimalModel"
    import ApplianceModel from "../../../store/models/Automation/ApplianceModel"
    import HabitatModel from '../../../store/models/Core/HabitatModel'
    import HabitatTypeModel from '../../../store/models/Core/HabitatTypeModel'
    import PhysicalSensorModel from "../../../store/models/Monitoring/PhysicalSensorModel"
    import StepperForm from "../StepperForm"
    import StepperFormStep from "../StepperFormStep"
    import StepperFormFinish from "../StepperFormFinish"
    import LocationModel from "../../../store/models/Core/LocationModel"
    import ApplianceGroupModel from "../../../store/models/Automation/ApplianceGroupModel"

    export default {

        extends: StepperForm,

        components: {
            StepperFormStep, StepperFormFinish,
            HabitatInline, AnimalInline,
            AutocompleteSelect
        },

        data () {
            return {
                HabitatTypeModel: HabitatTypeModel,
                AnimalModel: AnimalModel,
                PhysicalSensorModel: PhysicalSensorModel,
                LocationModel: LocationModel,
                ApplianceModel: ApplianceModel,
                ApplianceGroupModel: ApplianceGroupModel,
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
                        appliances: [],
                        appliance_groups: []
                    }
                },
                validation: {
                    name: 'required',
                    habitat_type: 'required',
                    location: 'required'
                },
                steps: 4,
                ready: false
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
        }

    }

</script>
