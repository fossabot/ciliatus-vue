import Model from "../Model"
import WorkflowModel from "./WorkflowModel"

export default class WorkflowStartTimeConditionModel extends Model {
    static name = 'WorkflowStartTimeCondition'
    static entity = 'workflow_start_time_condition'
    static package = 'automation'

    static getRelationNames () {
        return [
            'workflow'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            is_active: this.attr(null),

            start_at: this.attr(null),

            workflow_id: this.attr(null),

            workflow: this.belongsTo(WorkflowModel, 'workflow_id')
        }
    }
}
