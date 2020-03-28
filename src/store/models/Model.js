import { Model as VuexModel } from '@vuex-orm/core'
import config from "../../config"

export default class Model extends VuexModel {
    static baseUrl = config.api.basePath + config.api.prefix
    static webBaseUrl = config.web.basePath + config.web.prefix
    static icon = 'mdi-help'
    static menu = false

    static apiConfig = {
        actions: {
            fetch: {
                method: 'get',
                url: Model.baseUrl
            }
        }
    }

    static webConfig = {
        actions: {
            create: Model.webBaseUrl + '%s/create',
            show: Model.webBaseUrl + '%s/%s',
            edit: Model.webBaseUrl + '%s/%s/edit',
            del: Model.webBaseUrl + '%s/%s/delete',
        }
    }

    static axiosConfig = {
        dataKey: 'data'
    }

    static fields () {
        return {
            id: this.attr(null),
            timestamps: this.attr({}),
            _fk: this.attr(''),
            _model: this.attr(''),
            _icon: this.attr(''),
            _self: this.attr(''),
            _relations: this.attr({})
        }
    }

    static getRelationNames () {
        return []
    }

    static getQueryWithAllRelations () {
        let query = this.query()
        this.getRelationNames().forEach((relation) => { query = query.with(relation); })

        return query
    }

    static fetchById (id) {
        window.vueApp.$emit('ModelUpdateStarted', this.name, id)
        return this.api().get(Model.baseUrl + this.package + '/' + this.entity + '/' + id, this.axiosConfig).then(() => {
            window.vueApp.$emit('ModelUpdateFinished', this.name, id)
        }).catch((error) => {
            window.vueApp.$emit('ModelUpdateFailed', this.name, id, error)
            if (error.response && error.response.status === 404) {
                window.vueApp.$emit('ModelDeleted', this.name, id, () => { this.delete(id) })
            }
        })
    }

    static announce (id) {
        window.vueApp.$emit('ModelLoaded', this.name, id)
    }

    static endpoint(operation = 'fetch') {
        return Model.apiConfig.actions[operation].url + this.package + '/' + this.entity
    }

    static view(operation = 'index') {
        if (operation !== 'index' && operation !== 'create') return
        return String(Model.webConfig.actions[operation]).sprintf(this.entity)
    }

    view(operation = 'show') {
        if (operation === 'show') return self.view()
        return String(Model.webConfig.actions[operation]).sprintf(self.entity, this.id)
    }

}

