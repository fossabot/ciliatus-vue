import Model from "../Model"
import ApplianceModel from "./ApplianceModel"
import CapabilityModel from "./CapabilityModel"
import ApplianceTypeCapabilityPivotModel from "./Pivot/ApplianceTypeCapabilityPivotModel"

export default class ApplianceTypeModel extends Model {
    static name = 'ApplianceType'
    static entity = 'appliance_types'
    static package = 'automation'

    static getRelationNames () {
        return [
            'appliances', 'capabilities'//, 'states'
        ]
    }

    static fields () {
        return {
            ...super.fields(),
            name: this.attr(''),

            model: this.attr(''),
            vendor: this.attr(''),
            protocol: this.attr(''),

            appliances: this.hasMany(ApplianceModel, 'appliance_type_id'),
            //states: this.hasMany(ApplianceTypeStateModel, 'appliance_type_id'),
            capabilities: this.belongsToMany(CapabilityModel, ApplianceTypeCapabilityPivotModel, 'appliance_type_id', 'capability_id')
        }
    }
}
