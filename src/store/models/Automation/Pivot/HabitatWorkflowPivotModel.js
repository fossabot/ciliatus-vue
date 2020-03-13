import Model from '../../Model'
import models from "../../../models";

export default class HabitatWorkflowPivotModel extends Model
{
    static name = 'HabitatWorkflowPivotModel'
    static entity = 'habitat_workflow_pivot'
    static package = 'automation'

    static primaryKey = ['workflow_id', 'belongsToModel_type', 'belongsToModel_id']

    static fields () {
        return {
            workflow_id: this.attr(null),
            belongsToModel_type: this.attr(null),
            belongsToModel_id: this.attr(null)
        }
    }

    get belongsToModel_entity() {
        if (!this.belongsToModel_type) return null

        return models[this.belongsToModel_type.split('\\').slice(-1)[0] + 'Model'].entity
    }

}
