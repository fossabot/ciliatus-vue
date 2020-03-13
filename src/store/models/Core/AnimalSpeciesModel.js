import Model from "../Model"
import AnimalClassModel from "./AnimalClassModel"
import AnimalModel from "./AnimalModel"
import models from "../../models";

export default class AnimalSpeciesModel extends Model {
    static name = 'AnimalSpecies'
    static entity = 'animal_species'
    static package = 'core'

    static getRelationNames () {
        return [
            'animal_class', 'animals'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name_common: this.attr(null),
            name_latin: this.attr(null),
            animal_class_id: this.attr(null),
            animals: this.hasMany(AnimalModel, 'animal_species_id'),
            animal_class: this.belongsTo(AnimalClassModel, 'animal_class_id')
        }
    }

    get name () {
        if (this.name_latin) {
            if (this.name_common) {
                return this.name_latin + ' (' + this.name_common + ')'
            }

            return this.name_latin
        }

        return this.name_common
    }
}
