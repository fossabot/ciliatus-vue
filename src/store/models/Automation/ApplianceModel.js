import Model from "../Model"
import ApplianceTypeModel from "./ApplianceTypeModel"
import ApplianceGroupModel from "./ApplianceGroupModel"
import ApplianceApplianceGroupPivotModel from "./Pivot/ApplianceApplianceGroupPivotModel"

export default class ApplianceModel extends Model {
    static name = 'Appliance'
    static entity = 'appliances'
    static package = 'automation'

    static getRelationNames () {
        return [
            'appliance_type', 'groups'//, 'habitats'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            is_active: this.attr(null),

            appliance_type_id: this.attr(null),
            state: this.attr(null),
            state_text: this.attr(null),
            maintenance_interval_days: this.attr(null),
            next_maintenance_due_days: this.attr(null),
            last_maintenance_at: this.attr(null),
            next_maintenance_due_at: this.attr(null),

            appliance_type: this.belongsTo(ApplianceTypeModel, 'appliance_type_id'),
            groups: this.belongsToMany(ApplianceGroupModel, ApplianceApplianceGroupPivotModel, 'appliance_id', 'appliance_group_id')
        }
    }

    get type () {
        return this.appliance_type
    }
}
