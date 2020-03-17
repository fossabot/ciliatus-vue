import Model from "../Model"
import PhysicalSensorModel from "./PhysicalSensorModel"
import LogicalSensorTypeModel from "./LogicalSensorTypeModel"

export default class LogicalSensorModel extends Model {
    static name = 'LogicalSensor'
    static entity = 'logical_sensors'
    static package = 'monitoring'

    static getRelationNames () {
        return [
            'physical_sensor', 'logical_sensor_type'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(null),
            reading_correction: this.attr(null),
            current_reading_raw: this.attr(null),
            current_reading_corrected: this.attr(null),
            physical_sensor_id: this.attr(null),
            logical_sensor_type_id: this.attr(null),
            state: this.attr(null),
            state_text: this.attr(null),

            physical_sensor: this.belongsTo(PhysicalSensorModel, 'physical_sensor_id'),
            logical_sensor_type: this.belongsTo(LogicalSensorTypeModel, 'logical_sensor_type_id')
        }
    }

    get current_reading_corrected_rounded () {
        return parseInt(this.current_reading_corrected * 100) / 100
    }

    get type () {
        return this.logical_sensor_type
    }
}
