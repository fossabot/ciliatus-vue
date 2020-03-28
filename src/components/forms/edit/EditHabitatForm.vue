<script>

    import HabitatForm from "../templates/HabitatForm";
    import HabitatModel from "../../../store/models/Core/HabitatModel";
    import FormActionEnum from "../FormActionEnum";
    import ModelFactory from "../../../store/models/ModelFactory";

    export default {

        extends: HabitatForm,

        props: {
            id: {
                type: Number,
                required: true
            }
        },

        data () {
            return {
                submit: {
                    entity: HabitatModel.entity + '/' + this.id,
                    action: FormActionEnum.UPDATE
                }
            }
        },

        computed: {
            object () {
                return HabitatModel.query().withAllRecursive().find(this.id)
            }
        },

        created () {
            ModelFactory.fetch(HabitatModel, this.id, (r, ids) => {
                this.form = {
                    name: this.object.name,
                    relations: {
                        habitat_type: this.object.habitat_type.id,
                        location: this.object.location.id,
                        animals: this.object.animals.map((a) => a.id),
                        physical_sensors: this.object.animals.map((s) => s.id),
                        appliances: this.object.appliance_groups.filter((g) => g.is_builtin).map((g) => g.appliances.map((a) => a.id)),
                        appliance_groups: this.object.appliance_groups.map((g) => g.id)
                    }
                }
                this.ready = true
                this.$root.$emit('RecomputeBreadcrumbs')
            })
        }

    }

</script>
