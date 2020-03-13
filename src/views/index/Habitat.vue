<template>
   <div>
      <habitat-card-stream :on-initial-load-done="onInitialDone"> </habitat-card-stream>

      <model-speed-dial :model="model" create edit del> </model-speed-dial>
   </div>
</template>

<script>
    import IndexView from "./IndexView"
    import HabitatCardStream from "../../components/cardstreams/HabitatCardStream"
    import HabitatModel from "../../store/models/Core/HabitatModel"
    import ModelSpeedDial from "../../components/misc/ModelSpeedDial";

    export default {
        extends: IndexView,

        data () {
            return {
                model: HabitatModel
            }
        },

        components: {
           ModelSpeedDial, HabitatCardStream
        }
    }
</script>
