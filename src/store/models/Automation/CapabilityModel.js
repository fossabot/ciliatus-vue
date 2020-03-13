import Model from "../Model"
import ApplianceTypeModel from "./ApplianceTypeModel"
import ApplianceTypeCapabilityPivotModel from "./Pivot/ApplianceTypeCapabilityPivotModel"

export default class CapabilityModel extends Model {
    static name = 'Capability'
    static entity = 'capabilities'
    static package = 'automation'

    static getRelationNames () {
        return [
            //'appliance_types'//, 'appliance_groups', 'workflows'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            affected_metric_name: this.attr(''),
            lowers_affected_metric: this.attr(null),
            rises_affected_metric: this.attr(null)

            //appliances_types: this.belongsToMany(ApplianceTypeModel, ApplianceTypeCapabilityPivotModel, 'capability_id', 'appliance_type_id'),
            //appliance_groups: this.belongsToMany(ApplianceGroupModel, ApplianceGroupCapabilityPivotModel, 'capability_id', 'appliance_group_id'),
            //workflows: this.belongsToMany(WorkflowModel, CapabilityWorkflowPivotModel, 'capability_id', 'workflow_id')
        }
    }
}
