const appError = require("../utils/appError");



exports.createReviewMiddleware = (req, res, next) => {
    if (!req.body.ofProduct) {
        req.body.ofProduct = req.params.productId;
    }

    if (!req.body.byUser) {
        req.body.byUser = req.userE._id;

    }

    if (!req.body.byUser || !req.body.ofProduct) {
        return next(new appError('please login to create  a review'))
    }

    next()


}











