import ApplianceTypeModel from "./models/Automation/ApplianceTypeModel"
import ApplianceTypeStateModel from "./models/Automation/ApplianceTypeStateModel"
import ApplianceModel from "./models/Automation/ApplianceModel"
import ApplianceGroupModel from "./models/Automation/ApplianceGroupModel"
import CapabilityModel from "./models/Automation/CapabilityModel"
import WorkflowModel from "./models/Automation/WorkflowModel"
import WorkflowActionModel from "./models/Automation/WorkflowActionModel"
import HabitatWorkflowPivotModel from "./models/Automation/Pivot/HabitatWorkflowPivotModel"
import ApplianceGroupHabitatPivotModel from "./models/Automation/Pivot/ApplianceGroupHabitatPivotModel"
import ApplianceGroupCapabilityPivotModel from "./models/Automation/Pivot/ApplianceGroupCapabilityPivotModel"
import ApplianceApplianceGroupPivotModel from "./models/Automation/Pivot/ApplianceApplianceGroupPivotModel"
import ApplianceTypeCapabilityPivotModel from "./models/Automation/Pivot/ApplianceTypeCapabilityPivotModel"
import CapabilityWorkflowPivotModel from "./models/Automation/Pivot/CapabilityWorkflowPivotModel"

import AnimalModel from "./models/Core/AnimalModel"
import AnimalClassModel from "./models/Core/AnimalClassModel"
import AnimalSpeciesModel from "./models/Core/AnimalSpeciesModel"
import HabitatModel from "./models/Core/HabitatModel"
import HabitatTypeModel from "./models/Core/HabitatTypeModel"
import LocationModel from "./models/Core/LocationModel"
import LocationTypeModel from "./models/Core/LocationTypeModel"

import LogicalSensorModel from "./models/Monitoring/LogicalSensorModel"
import LogicalSensorTypeModel from "./models/Monitoring/LogicalSensorTypeModel"
import PhysicalSensorModel from "./models/Monitoring/PhysicalSensorModel"
import PhysicalSensorTypeModel from "./models/Monitoring/PhysicalSensorTypeModel"

export default {
    ApplianceTypeModel: ApplianceTypeModel,
    ApplianceTypeStateModel: ApplianceTypeStateModel,
    ApplianceModel: ApplianceModel,
    ApplianceGroupModel: ApplianceGroupModel,
    CapabilityModel: CapabilityModel,
    WorkflowModel: WorkflowModel,
    WorkflowActionModel: WorkflowActionModel,
    HabitatWorkflowPivotModel: HabitatWorkflowPivotModel,
    ApplianceGroupHabitatPivotModel: ApplianceGroupHabitatPivotModel,
    ApplianceGroupCapabilityPivotModel: ApplianceGroupCapabilityPivotModel,
    ApplianceApplianceGroupPivotModel: ApplianceApplianceGroupPivotModel,
    ApplianceTypeCapabilityPivotModel: ApplianceTypeCapabilityPivotModel,
    CapabilityWorkflowPivotModel: CapabilityWorkflowPivotModel,

    AnimalClassModel: AnimalClassModel,
    AnimalModel: AnimalModel,
    AnimalSpeciesModel: AnimalSpeciesModel,
    HabitatModel: HabitatModel,
    HabitatTypeModel: HabitatTypeModel,
    LocationModel: LocationModel,
    LocationTypeModel: LocationTypeModel,

    LogicalSensorModel: LogicalSensorModel,
    LogicalSensorTypeModel: LogicalSensorTypeModel,
    PhysicalSensorModel: PhysicalSensorModel,
    PhysicalSensorTypeModel: PhysicalSensorTypeModel
}
