
// requring model
const appError = require('../utils/appError');
const User = require('./../Models/UserSchema');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

const crypto = require('crypto')
// send mail
const sendMail = require('./../utils/sendEmail')


const createTokenSendRes = (id, res, statusCode, message) => {

    let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRIR_IN
    });
    let cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),

        secure: false,
        httpOnly: true
    };
    if (process.env.NODE_ENV == 'production') {

        cookieOptions.secure = true
    }
    res.cookie('jwt', token, cookieOptions);
    // we will set cookies 
    res.status(statusCode).json({
        status: "success",
        token
    })
}


exports.signUp = catchAsync(async (req, res, next) => {
    console.log("came");
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });


    newUser.password = undefined;
    createTokenSendRes(newUser._id, res, 201, newUser)
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError("please enter credential for get into in ", 400));
    }

    const user = await User.findOne({ email }).select('+password')


    if (!user || ! await user.correctPass(password, user.password)) {
        return next(new appError("please enter valid email id and password", 400));
    }
    // user.password = undefined
    createTokenSendRes(user.id, res, 200, user)

})



exports.logout = function (req, res) {
    console.log("came");
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).json({ status: 'success' })
}


exports.forgotPassword = catchAsync(async (req, res, next) => {

    const email = req.body.email;
    if (!email) {
        return next(new appError("please enter email for changing the password", 400));
    }

    // we need to find the user from DB and set password reset token in enc format
    const user = await User.findOne({ email })
    if (!user) {
        return next(new appError("user do not exist with this mail ID,please register with your mail ID", 400));
    }

    try {
        const token = user.setPasswordRestToken();
        console.log(token);
        let message = `to reset the passwored click heare ${req.protocol}://${req.hostName}/api/v1/resetPassword/${token} `;

        console.log("the token is ", token);
        // saving the user to database
        await user.save({ validateBeforeSave: false })
        // we will send the message of route and token on email address and 
        await sendMail({
            to: user.email,
            message,
            subject: 'Reset Password'
        })
    } catch (error) {
        console.log(error);
        user.passwordResetToken = undefined;
        user.expiresIn = undefined;
        await user.save();
        return next(new appError("please try to change the password after some time", 404))
    }


    res.status(200).json({
        status: 'success',
        message: "check your email to reset password !!"
    })




})




exports.resetPassword = catchAsync(async (req, res, next) => {
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    if (!password) {
        return next(new appError("please enter password to be set", 400))
    }
    let token = req.params.token;


    // we need to create hash and then find it in database 

    token = crypto.createHash('sha256').update(token).digest('hex');
    let user = await User.findOne({
        passwordResetToken: token, passwordExpires: { $gt: Date.now() }
    })

    if (!user) {
        return next(new appError("please enter valid token or token has been expired", 400))
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;

    user.passwordResetToken = undefined;
    user.passwordExpires = undefined;

    await user.save();

    createTokenSendRes(user._id, res, 200, "your password is changed")









})















