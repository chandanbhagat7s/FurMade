
const express = require('express');
const router = express();
const paymentRoute = require('./../Controllers/paymentController')

router.post('/orders', paymentRoute.pay);
router.post('/verify', paymentRoute.verifyPayment);
router.get('/getKey', paymentRoute.getKey);
router.post('/payment', paymentRoute.newPayment);
router.post('/status/:txnId', paymentRoute.checkStatus);


module.exports = router;