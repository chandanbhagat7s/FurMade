const Product = require("../Models/ProductSchma")
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
    console.log("params is ", req.params);
    const products = await Product.findOne({ slug: req.params.slug }).populate('review')
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














