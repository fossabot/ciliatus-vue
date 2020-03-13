import Model from '../../Model'

export default class CapabilityWorkflowPivotModel extends Model
{
    static name = 'CapabilityWorkflowPivotModel'
    static entity = 'capability_workflow_pivot'
    static package = 'automation'

    static primaryKey = ['capability_id', 'workflow_id']

    static fields () {
        return {
            capability_id: this.attr(null),
            workflow_id: this.attr(null)
        }
    }

}
