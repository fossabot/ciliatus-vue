import Model from "../Model"

export default class ApplianceTypeStateModel extends Model {
    static name = 'ApplianceTypeState'
    static entity = 'appliance_type_states'
    static package = 'automation'

    static getRelationNames () {
        return [
            'appliance_type'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            is_appliance_on: this.attr(null),
            has_level: this.attr(null),
            level_minimum: this.attr(null),
            level_maximum: this.attr(null),
            level_step_size: this.attr(null),

            appliance_type_id: this.attr(null),

            //appliance_type: this.belongsTo(ApplianceTypeModel, 'appliance_type_id')
        }
    }
}
