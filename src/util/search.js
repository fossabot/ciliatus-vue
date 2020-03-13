export default class Search {

    static resolveSearchString (string, mapping = null) {
        if (string.length < 1) return {}

        if (string.match(/^[a-z0-9]+$/i)) return {name: string}

        let resolved = {}, term, regex = /([a-z.]+):([^,]+)/ig
        while ((term = regex.exec(string)) !== null) {
            resolved[term[1]] = term[2]
        }

        if (mapping) {
            Object.keys(mapping).forEach((m) => {
                if (resolved[m]) {
                    resolved[mapping[m]] = resolved[m]
                    delete resolved[m]
                }
            })
        }

        return resolved
    }

    static resolveSearchStringToApiRequest (string, mapping = null) {
        let resolved = Search.resolveSearchString(string, mapping), query = []
        Object.keys(resolved).forEach((field) => {
            query.push('filter[' + field + ']=' + resolved[field])
        })

        return query.join('&')
    }

}
