
const express = require('express');
const Rout = express.Router()

const paymentController = require('./../Controllers/paymentController')

Rout.post('/pay', paymentController.doPayment)
Rout.post('/status', paymentController.doPayment)


module.exports = Rout;












