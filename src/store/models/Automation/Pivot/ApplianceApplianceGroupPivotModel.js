import Model from '../../Model'

export default class ApplianceApplianceGroupPivotModel extends Model
{
    static name = 'ApplianceApplianceGroupPivotModel'
    static entity = 'appliance_appliance_group_pivot'
    static package = 'automation'

    static primaryKey = ['appliance_id', 'appliance_group_id']

    static fields () {
        return {
            appliance_id: this.attr(null),
            appliance_group_id: this.attr(null)
        }
    }

}
