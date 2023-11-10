const runAsync = require("../utils/catchAsync");
const factory = require('./factory')
const Review = require('./../Models/ReviewSchema');
const User = require("../Models/UserSchema");
const appError = require("../utils/appError");




exports.createReview = runAsync(async (req, res, next) => {


    const user = await Review.findOne({ byUser: req.body.byUser, ofProduct: req.body.ofProduct })

    if (user) {
        return next(new appError('you have posted an review once for this product !!', 404))
    }

    const doc = await Review.create({
        ...req.body
    })
    if (!doc) {
        return next(new appError('failed to create doc please try again to create !!', 404))
    }


    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})
exports.getAllReview = factory.getAll(Review)



























