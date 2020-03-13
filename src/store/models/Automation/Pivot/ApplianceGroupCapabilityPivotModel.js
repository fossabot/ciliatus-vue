import Model from '../../Model'

export default class ApplianceGroupCapabilityPivotModel extends Model
{
    static name = 'ApplianceGroupCapabilityPivotModel'
    static entity = 'appliance_group_capability_pivot'
    static package = 'automation'

    static primaryKey = ['appliance_group_id', 'capability_id']

    static fields () {
        return {
            appliance_group_id: this.attr(null),
            capability_id: this.attr(null)
        }
    }

}
