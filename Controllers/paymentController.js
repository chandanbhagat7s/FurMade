const axios = require('axios');


const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");



function generateTransactionID() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    const merchantPrefix = 'T';
    const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
    return transactionID;
}

exports.doPayment = runAsync(async (req, res, next) => {
    const { name, mobileNumber, amount } = req.body;
    if (!name || !mobileNumber || !amount) {
        return appError('please enter all the details for completing the transaction', 400);
    }

    const data = {
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": generateTransactionID,
        "merchantUserId": "MUID123ABCDEF1234",
        "amount": amount,
        "name": name,
        "redirectUrl": "https://127.0.0.1:3000/api/v1/payment/status",
        "redirectMode": "POST",
        "callbackUrl": "https://webhook.site/callback-url",
        "mobileNumber": mobileNumber,
        "paymentInstrument": {
            "type": "PAY_PAGE"
        }
    }

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
    const keyIndex = 1;
    const string = payloadMain + '/pg/v1/pay' + key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
    // const URL "https://api.phonepe.com/apis/hermes/pg/v1/pay"



    const options = {
        method: 'POST',
        url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
        headers: {
            accept: 'application/json', 'Content-Type': 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payloadMain

        }
    };


    axios
        .request(options)
        .then(function (response) {
            console.log(response);
            return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
        })
        .catch(function (error) {
            console.error(error);
            // return next(new appError(error.message,400))
        });



})















