<template>
    <div>
        <canvas v-show="rendered" :id="planeElementId" style="width:100%; height:300px; touch-action:none"> </canvas>
    </div>
</template>

<script>
    import Component from "../Component"
    import ModelFactory from "../../store/models/ModelFactory"
    import HabitatRenderer from "../../util/HabitatRenderer"
    import HabitatModel from "../../store/models/Core/HabitatModel"

    export default {
        extends: Component,

        props: {
            renderOnLoad: Boolean
        },

        data () {
            return {
                model: HabitatModel,
                renderer: null,
                rendered: false
            }
        },

        computed: {
            object () {
                return this.model.query()
                    .with('physical_sensors')
                    .with('physical_sensors.logical_sensors')
                    .with('physical_sensors.logical_sensors.type')
                    .find(this.id)
            },
            planeElementId () {
                return 'habitat_render_' + this.id
            }
        },

        methods: {
            refresh () {
                ModelFactory.refresh(this.model, this.object.id, [ 'physical_sensors', 'physical_sensors.logical_sensors', 'physical_sensors.logical_sensors.type' ])
            },
            render (parent) {
                this.rendered = true

                parent.renderLoading = true
                setTimeout(() => {
                    new Promise(() => {
                        let theme = this.$vuetify.theme.isDark ? {
                            clearColor: { r: 0.2575, g: 0.2575, b: 0.2575 },
                            edgeColor: { r: 0.9, g: 0.9, b: 0.9 },
                            componentColor: { r: 0.7, g: 0.7, b: 0.7 },
                            fontColor: "white"
                        } : {
                            clearColor: { r: 1, g: 1, b: 1 },
                            edgeColor: { r: 0.2575, g: 0.2575, b: 0.2575 },
                            componentColor: { r: 0.1, g: 0.1, b: 0.1 },
                            fontColor: "black"
                        }

                        this.renderer = new HabitatRenderer(document.getElementById(this.planeElementId), {
                            width: parseInt(this.object.width),
                            height: parseInt(this.object.height),
                            depth: parseInt(this.object.depth)
                        }, theme)

                        this.renderer.createScene().createHabitat()

                        this.object.physical_sensors.forEach((sensor) => {
                            this.renderer.addSensor(sensor.id, {
                                x: parseInt(sensor.position_x),
                                y: parseInt(sensor.position_y),
                                z: parseInt(sensor.position_z)
                            }, sensor.logical_sensors.map((ls) => {
                                return "" + ls.current_reading_corrected_rounded + ls.type.reading_type_symbol
                            }).join(', '))
                        })

                        this.renderer.render()
                        parent.renderLoading = false
                    })
                }, 200)
            }
        },

        mounted () {
            if (this.renderOnLoad) this.render(this.$parent)
        }
    }
</script>
