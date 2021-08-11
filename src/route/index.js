const express = require('express')
const route = express.Router()
const controller = require('../controller')

route
    .get('/indexing', controller.getAll)
    .get('/kurs', controller.getDataBetween)
    .get('/kurs/:symbol', controller.getCurrencyBetween)
    .post('/kurs', controller.addData)
    .put('/kurs', controller.updateData)
    .delete('/kurs/:date', controller.deleteData)


module.exports = route