
// requring the model for crud 

const product = require("../Models/ProductSchma");
const User = require("../Models/UserSchema");
const app = require("../app");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const factory = require('./factory')

exports.changePassword = catchAsync(async (req, res, next) => {
    if (!req.body.password || !req.body.passwordConfirm) {
        return next(new appError("please enter password and confirmPassword to  reset", 400));
    }

    const { password, passwordConfirm } = req.body;

    const user = req.userE;

    if (!user) {
        return next(new appError("please login ", 400));
    }

    user.password = password;
    user.passwordConfirm = passwordConfirm;

    await user.save();

    res.status(200).json({
        status: "success",
        message: "Password is changed"
    })


    // update ME

    const filterObj = (Obj, ...only) => {
        const retObj = {};

        Object.keys(Obj).forEach(el => {
            if (only.includes(el)) {
                retObj[el] = Obj[el];
            }
        })

        return retObj;

    }


    exports.updateMe = catchAsync(async (req, res, next) => {

        const user = req.userE;
        if (!user) {
            return next(new appError("please login ", 400));
        }

        const updateObj = filterObj(req.body, 'email', 'name')

        await User.findByIdAndUpdate(user._id, updateObj);

        res.status(200).json({
            status: "success",
            message: "your information is updated"
        })


    })


})



// for admin 

exports.deleteUser = factory.deleteOne(User)

exports.getAll = factory.getAll(User)

exports.updateUser = factory.updateOne(User)




// adding to cart
exports.addTocart = catchAsync(async (req, res, next) => {

    const item = await product.findOne({ productName: req.body.productName })
    // console.log(item);
    if (!item) {
        return next(new appError('falied to find the product', 404))
    }
    // console.log(item._id);
    const addItemID = await User.findByIdAndUpdate(req.userE._id, {
        $push: { userCart: item._id }
    }, { new: true })

    // console.log(addItemID);

    res.status(200).json({
        status: 'success'

    })

})


// remove from cart
exports.removeFromCart = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    const item = await product.findOne({ productName: req.body.productName })
    // console.log(item);
    if (!item) {
        return next(new appError('falied to find the product', 404))
    }
    // console.log(item._id);
    const addItemID = await User.findByIdAndUpdate(req.userE._id, {
        $pull: { userCart: item._id }
    }, { new: true })

    // console.log(addItemID);

    res.status(200).json({
        status: 'success'

    })

})






























