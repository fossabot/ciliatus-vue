import Model from "../Model"
import ApplianceModel from "./ApplianceModel";
import ApplianceApplianceGroupPivotModel from "./Pivot/ApplianceApplianceGroupPivotModel";
import CapabilityModel from "./CapabilityModel";
import ApplianceGroupCapabilityPivotModel from "./Pivot/ApplianceGroupCapabilityPivotModel";
import HabitatModel from "../Core/HabitatModel";
import ApplianceGroupHabitatPivotModel from "./Pivot/ApplianceGroupHabitatPivotModel";

export default class ApplianceGroupModel extends Model {
    static name = 'ApplianceGroup'
    static entity = 'appliance_groups'
    static package = 'automation'

    static getRelationNames () {
        return [
            'appliances', 'capabilities', 'habitats'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            is_active: this.attr(null),
            is_builtin: this.attr(null),

            appliances: this.belongsToMany(ApplianceModel, ApplianceApplianceGroupPivotModel, 'appliance_group_id', 'appliance_id'),
            capabilities: this.belongsToMany(CapabilityModel, ApplianceGroupCapabilityPivotModel, 'appliance_group_id', 'capability_id'),
            habitats: this.morphedByMany(HabitatModel, ApplianceGroupHabitatPivotModel, 'appliance_group_id', 'belongsToModel_id', 'belongsToModel_type')
        }
    }
}
