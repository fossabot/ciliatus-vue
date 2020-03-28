<script>

    import HabitatForm from "../templates/HabitatForm";
    import HabitatModel from "../../../store/models/Core/HabitatModel";
    import FormActionEnum from "../FormActionEnum";

    export default {

        extends: HabitatForm,

        data () {
            return {
                submit: {
                    entity: HabitatModel.entity,
                    action: FormActionEnum.CREATE
                },
                ready: true
            }
        }

    }

</script>
