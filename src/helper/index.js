module.exports = {
    response: (res, result, status, error, message) => {
        let resultPrint = {}

        resultPrint.error = error || null
        resultPrint.status = status || 200
        resultPrint.result = result
        resultPrint.message = message || null


        return res.status(resultPrint.status).json(resultPrint)
    },
}