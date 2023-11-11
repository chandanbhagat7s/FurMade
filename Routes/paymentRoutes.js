
const express = require('express');
const router = express();
const paymentRoute = require('./../Controllers/paymentController')

router.post('/payment', paymentRoute.newPayment);
router.post('/status/:txnId', paymentRoute.checkStatus);

module.exports = router;