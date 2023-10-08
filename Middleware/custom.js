


exports.createReviewMiddleware = (req, res, next) => {
    if (!req.body.ofProduct) {
        req.body.ofProduct = req.params.productId;
    }

    if (!req.body.byUser) {
        req.body.byUser = req.userE._id;

    }

    next()


}











