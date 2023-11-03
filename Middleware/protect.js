const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync");


exports.isLogedIn = async (req, res, next) => {

    // we need to see weather the user is loged in or not

    if (req.cookies.jwt) {
        try {
            if (req.cookies.jwt == 'logout') {
                return next();
            }




            // we need to get the id from the token which we have encoded 
            let decode = jwt.decode(req.cookies.jwt, process.env.JWT_SECRET_KEY)
            let currentUser = await User.findById(decode.id);

            if (!currentUser) {
                return next()
            }

            // we need to check weater the password is changed or not 
            if (currentUser.IsPasswordChanged(decode.iat)) {
                return next()
            }


            // to get the data into the template 
            // console.log(currentUser);
            res.locals.user = currentUser;
            // req.userE = currentUser;
            console.log("finnnnnnnn");
            return next();

        } catch (error) {
            console.log(error);
            return next()
        }
    }

    next();
}




// this is the middleware for just rendering the pages difffrent for if user is logged 
exports.protectRoute = runAsync(async (req, res, next) => {

    // we need to see weather the user is loged in or not 
    let token;
    // console.log(token);
    console.log("cookies", req.cookies.jwt);
    if (req.cookies) {
        token = req.cookies.jwt
    }
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {

        return next(new appError("please login to get access"))
    }


    console.log(token);

    // we need to get the id from the token which we have encoded 
    let decode = jwt.decode(token, process.env.JWT_SECRET_KEY)
    let currentUser = await User.findById(decode.id).populate({
        path: 'userCart',
        select: 'productName price coverImage slug'
    });
    console.log(currentUser);

    if (!currentUser) {
        return next(new appError("user do not exist please register !!", 400))
    }

    // we need to check weater the password is changed or not 
    if (currentUser.IsPasswordChanged(decode.iat)) {
        return next(new appError("password has changed please login again", 401))
    }

    req.userE = currentUser;

    res.locals.user = currentUser;


    next()

})
