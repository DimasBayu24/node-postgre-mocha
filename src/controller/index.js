const model = require('../model')
const response = require('../helper')

module.exports = {
    getAll: (req, res) => {
        model.getAll()
            .then((result) => {
                response.response(res, result, 200, null, "Success request")
            })
            .catch((err) => {
                console.log(err);
                response.response(res, null, 404, err, "Error Request")
            })
    },
    getAllWithLimit: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        model.getDataCount().then((result) => {
            const total = result[0].total;
            model.getAllWithLimit(offset, limit)
                .then((result) => {
                    if (result[1] === undefined) {
                        response.response(res, null, 404, err, "Data not found")
                    } else {
                        response.response(res, result, 200, null, "Set of Data")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    response.response(res, null, 404, err, "Data not found")
                })
        }).catch((err) => {
            console.log(err);

            response.response(res, null, 404, err, "Data not found")
        })
    },
    getDataBetween: (req, res) => {
        const startDate = req.query.startDate || "none";
        const endDate = req.query.endDate || "none";
        if (startDate == "none" && endDate == "none") {
            response.response(res, "start & end date required", 200, null, "failed request")
        } else if (endDate == "none") {
            response.response(res, "end date required", 200, null, "failed request")
        } else if (startDate == "none") {
            response.response(res, "start date required", 200, null, "failed request")
        } else {
            model.getDataBetween(startDate, endDate)
                .then((result) => {
                    if (result.length < 1) {
                        response.response(res, "no data found", 200, null, "success")
                    } else {
                        response.response(res, result, 200, null, "success")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    response.response(res, null, 404, err, "Error")
                })
        }
    },
    getCurrencyBetween: (req, res) => {
        const startDate = req.query.startDate || "none";
        const endDate = req.query.endDate || "none";
        const currency = req.params.symbol || "none";
        console.log(currency);
        console.log(startDate);
        console.log(endDate);
        if (startDate == "none" || endDate == "none" || currency == "none") {
            response.response(res, "data required", 200, null, "failed request")
        } else {
            model.getCurrencyBetween(startDate, endDate, currency)
                .then((result) => {
                    if (result.length < 1) {
                        response.response(res, "no data found", 200, null, "success")
                    } else {
                        response.response(res, result, 200, null, "success")
                    }
                })
                .catch((err) => {
                    console.log(err)
                    response.response(res, null, 404, err, "Error")
                })
        }
    },
    addData: (req, res) => {
        let data = req.body;
        model.searchDataBy(data)
            .then((result) => {
                if (result.length < 1) {
                    model.getCurrencyId(data.symbol)
                        .then((result) => {
                            if (result.length < 1) {
                                model.insertNewCurrency(data.symbol)
                                    .then((result) => {
                                        model.addData(data, result[0].mata_uang_id)
                                            .then((result) => {
                                                response.response(res, result.rows, 200, null, "data has been successfully created")
                                            })
                                            .catch((err) => {
                                                console.log(err)
                                                response.response(res, null, 404, err, "Failed request")
                                            })
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        response.response(res, null, 404, err, "Failed request")
                                    })
                            } else {
                                model.addData(data, result[0].mata_uang_id)
                                    .then((result) => {
                                        response.response(res, result.rows, 200, null, "data has been successfully created")
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        response.response(res, null, 404, err, "Failed request")
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            response.response(res, null, 404, err, "Failed request")
                        })
                } else {
                    response.response(res, null, 200, null, "Data has been recorded before")
                }
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Failed request")
            })
    },
    updateData: (req, res) => {
        let data = req.body;
        model.searchDataBy(data)
            .then((result) => {
                if (result < 1) {
                    response.response(res, result, 200, null, "Did not matched to any data")
                } else {
                    model.updateData(data, result[0].mata_uang_id)
                        .then((result) => {
                            response.response(res, result, 200, null, "This data has been updated")
                        })
                        .catch((err) => {
                            console.log(err);
                            response.response(res, null, 404, err, "Failed request")
                        })
                }
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Failed request")
            })
    },
    deleteData: (req, res) => {
        const date = req.params.date
        model.deleteData(date)
            .then((result) => {
                response.response(res, result, 200, null, "This data has been deleted")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Id No found")
            })
    }
}