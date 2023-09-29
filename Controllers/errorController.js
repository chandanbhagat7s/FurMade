const appError = require("../utils/appError");


const castErrorHandlerDB = (err) => {
    let message = `invalid ${err.path} with value : ${err.value}`;
    return new appError(message, 400)
}

const dublicateErrorHandlerDB = (err) => {
    let value = Object.values(err.keyValue).join(" ")

    let msgStr = `the field ${Object.keys(err.keyValue).join(" ")}  with value ${value} already existes`
    return new appError(msgStr, 400)
}

const validationErrorHandlerDB = (err) => {
    let errText = Object.values(err.errors).map(el => el.message)
    return new appError(errText.join('. '), 400)
}

const callProdError = (err, res) => {
    if (err.isOperational) {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error'
        res.status(err.statusCode).json({
            status: err.status,
            msg: err.message
        })
    } else {
        res.status(500).json({
            status: 'error',
            msg: 'something went wrong'
        })
    }
}



const callDevError = (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        msg: err.message,
        stack: err.stack
    })
}






module.exports = (err, req, res, next) => {

    // distigushing between env..
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (err.name == 'CastError') {
            error = castErrorHandlerDB(error);
        }

        else if (err.code == 11000) {
            error = dublicateErrorHandlerDB(error)
        }
        else if (err.name == 'ValidationError') {
            error = validationErrorHandlerDB(error)
        }


        callProdError(error, res)
    } else {
        callDevError(err, res);
    }






    // console.log(err.stack);

};