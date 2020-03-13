import models from "../../models"
import Model from "../Model"
import CapabilityModel from "./CapabilityModel"
import WorkflowActionModel from "./WorkflowActionModel"
import WorkflowStartMetricConditionModel from "./WorkflowStartMetricConditionModel"
import WorkflowStartTimeConditionModel from "./WorkflowStartTimeConditionModel"
import CapabilityWorkflowPivotModel from "./Pivot/CapabilityWorkflowPivotModel"

export default class WorkflowModel extends Model {
    static name = 'Workflow'
    static entity = 'workflows'
    static package = 'automation'

    static getRelationNames () {
        return [
            'capabilities', 'actions'//, 'startMetricConditions', 'startTimeConditions'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            is_active: this.attr(null),

            capabilities: this.belongsToMany(CapabilityModel, CapabilityWorkflowPivotModel, 'workflow_id', 'capability_id'),
            actions: this.hasMany(WorkflowActionModel, 'workflow_id'),
            //startMetricConditions: this.hasMany(WorkflowStartMetricConditionModel, 'workflow_id'),
            //startTimeConditions: this.hasMany(WorkflowStartTimeConditionModel, 'workflow_id')
        }
    }

    get belongsToModel_entity() {
        if (!this.belongsToModel_type) return null

        let model_name = models[this.belongsToModel_type.split('\\').slice(-1)[0] + 'Model'].entity
        return model_name
    }
}
