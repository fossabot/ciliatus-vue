import Model from "../Model"
import HabitatModel from "./HabitatModel"

export default class HabitatTypeModel extends Model {
    static name = 'HabitatType'
    static entity = 'habitat_types'
    static package = 'core'

    static getRelationNames () {
        return [
            'habitats'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            habitats: this.hasMany(HabitatModel, 'habitat_type_id'),
        }
    }
}
