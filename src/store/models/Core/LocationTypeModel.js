import Model from "../Model"
import LocationModel from "./LocationModel"

export default class LocationTypeModel extends Model {
    static name = 'LocationTypeModel'
    static entity = 'location_types'
    static package = 'core'

    static getRelationNames () {
        return [
            'locations'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            locations: this.hasMany(LocationModel, 'location_type_id'),
        }
    }
}
