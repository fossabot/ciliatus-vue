import Model from '../../Model'

export default class ApplianceTypeCapabilityPivotModel extends Model
{
    static name = 'ApplianceTypeCapabilityPivotModel'
    static entity = 'appliance_type_capability_pivot'
    static package = 'automation'

    static primaryKey = ['appliance_type_id', 'capability_id']

    static fields () {
        return {
            id: this.attr(null),
            appliance_type_id: this.attr(null),
            capability_id: this.attr(null)
        }
    }

}
