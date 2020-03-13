import Model from "../Model"
import LogicalSensorModel from "./LogicalSensorModel"

export default class LogicalSensorTypeModel extends Model {
    static name = 'LogicalSensorType'
    static entity = 'logical_sensor_types'
    static package = 'monitoring'

    static getRelationNames () {
        return [
            'logical_sensors'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            icon: this.attr(''),
            reading_minimum: this.attr(''),
            reading_maximum: this.attr(''),
            reading_type_name: this.attr(''),
            reading_type_unit: this.attr(''),
            reading_type_symbol: this.attr(''),

            logical_sensors: this.belongsTo(LogicalSensorModel, 'logical_sensor_type_id')
        }
    }
}
