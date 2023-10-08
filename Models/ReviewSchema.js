
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'something to be written in review to be posted']
    },
    ofProduct: {
        type: mongoose.mongo.ObjectId,
        required: [true, 'review must belong to specific Product']
    },
    byUser: {
        type: mongoose.mongo.ObjectId,
        required: [true, 'review must belong to specific user']
    },
    rating: {
        type: Number,
        required: [true, 'A product must have rating ']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


})


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;





















