const Product = require("../Models/ProductSchma");
const Review = require("../Models/ReviewSchema");
const User = require("../Models/UserSchema");
const Apifeature = require("../utils/apiFeature");
const appError = require("../utils/appError");
const runAsync = require("../utils/catchAsync")


exports.Home = runAsync(async (req, res, next) => {
    const products = await Product.find();
    // console.log(products);

    res.status(200).render('viewPro', {
        title: 'name',
        products
    })
})
exports.success = runAsync(async (req, res, next) => {
    // const products = await Product.find();
    // console.log(products);

    res.status(200).render('success', {
        title: 'success',
        // products
    })
})
exports.fail = runAsync(async (req, res, next) => {
    // const products = await Product.find();
    // console.log(products);

    res.status(200).render('failed', {
        title: 'failed',
        // products
    })
})


exports.buyNowCard = runAsync(async (req, res, next) => {
    const products = await Product.findById(req.params.productName);

    if (!products) {
        return next(new appError("product not found !!", 404))
    }


    res.status(200).render('payNow', {
        title: 'Pay 💸',
        products
    })
})


exports.editProfile = runAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user);

    res.status(200).render('editProfile', {
        title: 'Edit Profile.. 🧑‍🏫',
        user
    })
})





exports.getProduct = runAsync(async (req, res, next) => {
    console.log("request is ", req.params);
    let products = await Product.findOne({ slug: req.params.slug }).populate({
        path: 'review',
        limit: 5,

    });


    products.review = products.review.sort((a, b) => b.rating - a.rating);




    if (!products) {
        return next(new appError("no product found with this name", 404));
    }



    res.status(200).render('each', {
        title: 'sofa',
        products
    })
})

exports.getAllReviewOfProduct = runAsync(async (req, res, next) => {
    let products = await Product.findOne({ slug: req.params.productName }).populate({
        path: 'review',

    });


    products.review = products.review.sort((a, b) => b.rating - a.rating);




    if (!products) {
        return next(new appError("no product found with this name", 404));
    }



    res.status(200).render('allReviews', {
        title: `Reviews of ${req.params.productName.toUpperCase()}`,
        review: products.review
    })
})

exports.Login = runAsync(async (req, res, next) => {


    res.status(200).render('login', {
        title: 'Login'
    })
})

exports.signup = runAsync(async (req, res, next) => {


    res.status(200).render('signup', {
        title: 'signup'
    })
})






exports.addNewProduct = runAsync(async (req, res, next) => {


    res.status(200).render('addProduct', {
        title: 'Add Product 😊'
    })
})



exports.deleteProduct = runAsync(async (req, res, next) => {


    res.status(200).render('deleteProduct', {
        title: 'delete Product 😒'
    })
})

exports.me = runAsync(async (req, res, next) => {


    res.status(200).render('account', {
        title: 'Profile'
    })
})


exports.hideProduct = runAsync(async (req, res, next) => {


    res.status(200).render('hideProduct', {
        title: 'hide Product 🫥'
    })
})


exports.getAllHiddenProduct = runAsync(async (req, res, next) => {
    // const products = await Product.findOne({ slug: req.params.slug }).populate('review');

    let options = {
        disableMiddlewares: true, // can be checked in middleware with this.options.disableMiddlewares
    };
    const products = await Product.find({ hidden: true }).setOptions(options)




    res.status(200).render('adminProd', {
        title: 'Hidden Products..💥',
        products
    })
})







exports.editProduct = runAsync(async (req, res, next) => {
    console.log("product name is ", req.params.proudttt);
    console.log("product name is ", req.params);
    const products = await Product.findOne({ productName: req.params.proudttt })

    if (!products) {
        return next(new appError('Product Not found'))

    }








    res.status(200).render('editProduct', {
        title: 'Edit Products..📝',
        products
    })
})










