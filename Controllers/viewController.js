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





exports.getProduct = runAsync(async (req, res, next) => {
    const products = await Product.findOne({ slug: req.params.slug }).populate('review');


    if (!products) {
        return next(new appError("no product found with this name", 404));
    }



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








