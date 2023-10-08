const runAsync = require("../utils/catchAsync");
const factory = require('./factory')
const Review = require('./../Models/ReviewSchema')




exports.createReview = factory.createOne(Review)
exports.getAllReview = factory.getAll(Review)



























