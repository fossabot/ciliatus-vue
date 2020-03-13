import Model from "../Model"
import LogicalSensorModel from "./LogicalSensorModel"
import PhysicalSensorTypeModel from "./PhysicalSensorTypeModel"
import models from "../../models"

export default class PhysicalSensorModel extends Model {
    static name = 'PhysicalSensor'
    static entity = 'physical_sensors'
    static package = 'monitoring'

    static getRelationNames() {
        return [
            'logical_sensors', 'type', 'belongsToModel'
        ]
    }

    static fields() {
        return {
            ...super.fields(),
            name: this.attr(''),
            position_name: this.attr(''),
            position_x: this.attr(null),
            position_y: this.attr(null),
            position_z: this.attr(null),
            state: this.attr(null),
            state_text: this.attr(null),

            physical_sensor_type_id: this.attr(null),
            belongsToModel_type: this.attr(null),
            belongsToModel_id: this.attr(null),

            logical_sensors: this.hasMany(LogicalSensorModel, 'physical_sensor_id'),
            type: this.belongsTo(PhysicalSensorTypeModel, 'physical_sensor_type_id'),
            belongsToModel: this.morphTo('belongsToModel_id', 'belongsToModel_entity')
        }
    }

    get belongsToModel_entity() {
        if (!this.belongsToModel_type) return null

        let model_name = models[this.belongsToModel_type.split('\\').slice(-1)[0] + 'Model'].entity
        return model_name
    }

    refreshReading() {
        return new Promise(() => setTimeout(() => {}, 1000)) //Dummy
    }
}

