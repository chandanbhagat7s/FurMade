const Product = require("../Models/ProductSchma");
const User = require("../Models/UserSchema");
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


exports.me = runAsync(async (req, res, next) => {
    // const user = await User.findById(userE.id);
    // console.log(products);
    console.log("came");

    res.status(200).render('account', {
        title: 'name',

    })
})


exports.getProduct = runAsync(async (req, res, next) => {
    // console.log("params is ", req.params);
    const products = await Product.findOne({ slug: req.params.slug }).populate('review');


    if (!products) {
        return next(new appError("no product found with this name", 404));
    }

    console.log(products);
    console.log("came");

    res.status(200).render('each', {
        title: 'sofa',
        products
    })
})

exports.Login = runAsync(async (req, res, next) => {


    res.status(200).render('login', {
        title: 'Login'
    })
})


exports.Signup = runAsync(async (req, res, next) => {


    res.status(200).render('signup', {
        title: 'Signup!'
    })
})














