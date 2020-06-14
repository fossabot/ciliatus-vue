<script>
    import Inline from "./Inline"
    import AnimalModel from "../../store/models/Core/AnimalModel"

    export default {
        extends: Inline,

        data () {
            return {
                model: AnimalModel
            }
        }
    }
</script>
