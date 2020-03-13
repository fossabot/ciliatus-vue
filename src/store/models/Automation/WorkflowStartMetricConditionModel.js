import Model from "../Model"
import WorkflowModel from "./WorkflowModel"

export default class WorkflowStartMetricConditionModel extends Model {
    static name = 'WorkflowStartMetricCondition'
    static entity = 'workflow_start_metric_condition'
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

            metric_type_name: this.attr(null),
            is_above: this.attr(null),
            is_below: this.attr(null),
            in_state_amount: this.attr(null),
            in_state_duration: this.attr(null),

            workflow_id: this.attr(null),

            workflow: this.belongsTo(WorkflowModel, 'workflow_id')
        }
    }
}
