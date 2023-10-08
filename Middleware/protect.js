const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");


exports.protectRoute = runAsync(async (req, res, next) => {

    // we need to see weather the user is loged in or not 
    let token;
    if (!req.headers.authorization) {
        return next(new appError("please login to get access"))
    }

    token = req.headers.authorization.split(' ')[1]
    console.log(token);

    // we need to get the id from the token which we have encoded 
    let decode = jwt.decode(token, process.env.JWT_SECRET_KEY)
    let currentUser = await User.findById(decode.id);

    if (!currentUser) {
        return next(new appError("user do not exist please register !!", 400))
    }

    // we need to check weater the password is changed or not 
    if (currentUser.IsPasswordChanged(decode.iat)) {
        return next(new appError("password has changed please login again", 401))
    }

    req.userE = currentUser;

    next()

})
