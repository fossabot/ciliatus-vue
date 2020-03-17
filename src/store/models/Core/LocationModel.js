import Model from "../Model"
import PhysicalSensorModel from "../Monitoring/PhysicalSensorModel"
import HabitatModel from "./HabitatModel"
import LocationTypeModel from "./LocationTypeModel"

export default class LocationModel extends Model {
    static name = 'Location'
    static entity = 'locations'
    static package = 'core'

    static getRelationNames () {
        return [
            'location_type', 'habitats', 'physical_sensors'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            location_type_id: this.attr(null),
            _monitor: this.attr(null),

            location_type: this.belongsTo(LocationTypeModel, 'location_type_id'),
            habitats: this.hasMany(HabitatModel, 'location_id'),
            physical_sensors: this.morphMany(PhysicalSensorModel, 'belongsToModel_id', 'belongsToModel_entity')
        }
    }

    get type_name () {
        if (!this.type) return ''
        return this.type.name
    }

    get type () {
        return this.location_type
    }
}
