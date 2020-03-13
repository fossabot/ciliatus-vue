import Model from "../Model"
import PhysicalSensorModel from "./PhysicalSensorModel"

export default class PhysicalSensorTypeModel extends Model {
    static name = 'PhysicalSensorType'
    static entity = 'physical_sensor_types'
    static package = 'monitoring'

    static getRelationNames () {
        return [
            'physical_sensors'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            model: this.attr(''),
            vendor: this.attr(''),
            protocol: this.attr(''),

            physical_sensors: this.hasMany(PhysicalSensorModel, 'physical_sensor_type_id'),
        }
    }
}
