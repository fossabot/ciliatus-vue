import Model from '../../Model'
import models from "../../../models";

export default class ApplianceGroupHabitatPivotModel extends Model
{
    static name = 'ApplianceGroupHabitatPivotModel'
    static entity = 'appliance_group_habitat_pivot'
    static package = 'automation'

    static primaryKey = ['appliance_group_id', 'belongsToModel_type', 'belongsToModel_id']

    static fields () {
        return {
            appliance_group_id: this.attr(null),
            belongsToModel_type: this.attr(null),
            belongsToModel_id: this.attr(null)
        }
    }

    get belongsToModel_entity() {
        if (!this.belongsToModel_type) return null

        return models[this.belongsToModel_type.split('\\').slice(-1)[0] + 'Model'].entity
    }

}
