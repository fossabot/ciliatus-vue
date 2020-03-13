import Model from "../Model"
import ApplianceTypeStateModel from "./ApplianceTypeStateModel"
import ApplianceModel from "./ApplianceModel"
import WorkflowModel from "./WorkflowModel"

export default class WorkflowActionModel extends Model {
    static name = 'WorkflowAction'
    static entity = 'workflow_actions'
    static package = 'automation'

    static getRelationNames () {
        return [
            'workflow', 'appliance', 'state'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            is_active: this.attr(null),

            workflow_time_offset_seconds: this.attr(null),
            target_level: this.attr(null),
            target_level_rampup_seconds: this.attr(null),

            appliance_id: this.attr(null),
            appliance_type_state_id: this.attr(null),
            workflow_id: this.attr(null),

            appliance: this.belongsTo(ApplianceModel, 'appliance_id'),
            state: this.belongsTo(ApplianceTypeStateModel, 'appliance_type_state_id'),
            workflow: this.belongsTo(WorkflowModel, 'workflow_id')
        }
    }
}
