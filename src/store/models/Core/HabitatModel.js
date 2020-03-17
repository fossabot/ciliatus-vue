import Model from "../Model"
import AnimalModel from "./AnimalModel"
import PhysicalSensorModel from "../Monitoring/PhysicalSensorModel"
import HabitatTypeModel from "./HabitatTypeModel"
import LocationModel from "./LocationModel"
import ApplianceGroupHabitatPivotModel from "../Automation/Pivot/ApplianceGroupHabitatPivotModel"
import ApplianceGroupModel from "../Automation/ApplianceGroupModel"
import WorkflowModel from "../Automation/WorkflowModel";
import HabitatWorkflowPivotModel from "../Automation/Pivot/HabitatWorkflowPivotModel";

export default class HabitatModel extends Model {
    static name = 'Habitat'
    static entity = 'habitats'
    static package = 'core'

    static getRelationNames () {
        return [
            'habitat_type', 'location', 'animals',
            'physical_sensors', 'appliance_groups',
            'workflows'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),
            location_id: this.attr(null),
            habitat_type_id: this.attr(null),
            width: this.attr(null),
            height: this.attr(null),
            depth: this.attr(null),
            _monitor: this.attr(null),

            habitat_type: this.belongsTo(HabitatTypeModel, 'habitat_type_id'),
            location: this.belongsTo(LocationModel, 'location_id'),
            animals: this.hasMany(AnimalModel, 'habitat_id'),
            physical_sensors: this.morphMany(PhysicalSensorModel, 'belongsToModel_id', 'belongsToModel_entity'),
            appliance_groups: this.morphToMany(ApplianceGroupModel, ApplianceGroupHabitatPivotModel, 'appliance_group_id', 'belongsToModel_id', 'belongsToModel_entity'),
            workflows: this.morphToMany(WorkflowModel, HabitatWorkflowPivotModel, 'workflow_id', 'belongsToModel_id', 'belongsToModel_entity')
        }
    }

    get type_name () {
        if (!this.type) return ''
        return this.type.name
    }

    get type () {
        return this.habitat_type
    }
}
