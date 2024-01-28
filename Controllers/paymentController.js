const axios = require('axios');
const crypto = require('crypto');

const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");



// function generateTransactionID() {
//     const timestamp = Date.now();
//     const randomNum = Math.floor(Math.random() * 1000000);
//     const merchantPrefix = 'T';
//     const transactionID = `${merchantPrefix}${timestamp}${randomNum}`;
//     return transactionID;
// }

// exports.doPayment = runAsync(async (req, res, next) => {
//     const { name, mobileNumber, amount } = req.body;
//     if (!name || !mobileNumber || !amount) {
//         return appError('please enter all the details for completing the transaction', 400);
//     }

//     const data = {
//         "merchantId": "PGTESTPAYUAT",
//         "merchantTransactionId": generateTransactionID,
//         "merchantUserId": "MUID123ABCDEF1234",
//         "amount": amount,
//         "name": name,
//         "redirectUrl": "https://127.0.0.1:3000/api/v1/payment/status",
//         "redirectMode": "POST",
//         "callbackUrl": "https://webhook.site/callback-url",
//         "mobileNumber": mobileNumber,
//         "paymentInstrument": {
//             "type": "PAY_PAGE"
//         }
//     }

//     const payload = JSON.stringify(data);
//     const payloadMain = Buffer.from(payload).toString('base64');
//     const key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
//     const keyIndex = 1;
//     const string = payloadMain + '/pg/v1/pay' + key;
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = sha256 + '###' + keyIndex;

//     const URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
//     // const URL "https://api.phonepe.com/apis/hermes/pg/v1/pay"



//     const options = {
//         method: 'POST',
//         url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
//         headers: {
//             accept: 'application/json', 'Content-Type': 'application/json',
//             'Content-Type': 'application/json',
//             'X-VERIFY': checksum
//         },
//         data: {
//             request: payloadMain

//         }
//     };


//     axios
//         .request(options)
//         .then(function (response) {
//             console.log(response);
//             return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
//         })
//         .catch(function (error) {
//             console.error(error);
//             // return next(new appError(error.message,400))
//         });



// })



exports.newPayment = async (req, res) => {
    try {
        console.log("body is ", req.body);
        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: process.env.MERCHENT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:3000/api/v1/payment/status/${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            },

        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + process.env.SALT_IS;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        console.log(checksum);

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"
        // const prod_URL = ' https://api-preprod.phonepe.com/apis/hermes'
        // const prod_URL = '  https://api.phonepe.com/apis/hermes'

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                withCredentials: true,
                'Access-Control-Allow-Origin': '*',
                Vary: 'Origin'

            },
            data: {
                request: payloadMain
            },


        };

        axios.request(options).then(function (response) {
            console.log("res is ", response.data)
            console.log("url is ", response.data.data.instrumentResponse.redirectInfo.url)
            return res.redirect(response.data.data.instrumentResponse.redirectInfo.url)
        })
            .catch(function (error) {
                console.error("error is ..............", error);
            });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
}

exports.checkStatus = async (req, res) => {
    console.log("came into check", res);
    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + process.env.SALT_IS;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    // CHECK PAYMENT TATUS
    axios.request(options).then(async (response) => {
        console.log("*****came into ", response.data);
        if (response.data.success === true) {
            const url = `http://localhost:3000/success`
            return res.redirect(url)
        } else {
            const url = `http://localhost:3000/failure`
            return res.redirect(url)
        }
    })
        .catch((error) => {
            console.error(error);
        });
};















