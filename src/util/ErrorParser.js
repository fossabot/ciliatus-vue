export default class ErrorParser {

    static parse (error) {
        window.console.log(error)
        window.console.log(error.message)
        return error
    }

}
