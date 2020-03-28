import Model from "../Model"
import HabitatModel from "./HabitatModel"
import AnimalSpeciesModel from "./AnimalSpeciesModel"

export default class AnimalModel extends Model {
    static name = 'Animal'
    static entity = 'animals'
    static package = 'core'
    static menu = true

    static getRelationNames () {
        return [
            'habitat', 'animal_species'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            habitat_id: this.attr(null),
            animal_species_id: this.attr(null),

            habitat: this.belongsTo(HabitatModel, 'habitat_id'),
            animal_species: this.belongsTo(AnimalSpeciesModel, 'animal_species_id')
        }
    }

    get species_name () {
        if (!this.animal_species) return ''
        return this.animal_species.name
    }
}
