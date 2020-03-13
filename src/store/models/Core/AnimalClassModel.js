import Model from "../Model"
import AnimalSpeciesModel from "./AnimalSpeciesModel"

export default class AnimalClassModel extends Model {
    static name = 'AnimalClass'
    static entity = 'animal_classes'
    static package = 'core'

    static getRelationNames () {
        return [
            'species'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            species: this.hasMany(AnimalSpeciesModel, 'animal_class_id')
        }
    }
}
