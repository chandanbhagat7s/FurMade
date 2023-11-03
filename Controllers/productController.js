// bringig model for crud operations in db
const Product = require('./../Models/ProductSchma');


//feature API
const Apifeature = require('../utils/apiFeature');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

// for create new product
exports.createNewProduct = catchAsync(async (req, res, next) => {

    const newProduct = await Product.create({
        ...req.body
    })
    if (!newProduct) {
        return next(new appError('failed to create product', 404))
    }


    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    })

})






// for getting all the tours
exports.getAllProduct = catchAsync(async (req, res, next) => {



    // let query = { ...req.query };

    // let remove = ['sort', 'fields', 'page', 'limit']
    // remove.forEach((el) => {
    //     delete query[el];
    // })



    // // 1B) Advanced filtering
    // let queryStr = JSON.stringify(query);
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    // console.log(queryStr);
    // let m = Product.find(JSON.parse(queryStr));
    // // 2) Sorting
    // if (req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     m = m.sort(sortBy);
    // }

    // if (req.query.fields) {
    //     const sortBy = req.query.fields.split(',').join(' ');
    //     m = m.select(sortBy);
    // }

    // // pagination 

    // let page = req.query.page * 1 || 1;
    // let limit = req.query.limit * 1 || 5;

    // if (req.query.page) {

    //     let skip = (page - 1) * limit;

    //     m = m.skip(skip).limit(limit)
    // }


    // const allProducts = await m;
    let features = new Apifeature(Product.find(), req.query).filter().sort().fields().pagination()

    let allProducts = await features.query;

    res.status(200).json({
        status: 'success',
        totalResult: allProducts.length,
        data: {
            product: allProducts
        }
    })

})

// get tour by id 

exports.getProductById = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate({
        path: 'review',
        select: '-__v -createdAt'
    })
    // console.log("product is : ..................... ", product);

    if (!product) {
        // console.log("entred");
        return next(new appError('unable to find id ', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })




})



exports.getProductByIdAndUpdate = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body
    }, {
        runValidators: true,
        new: true
    })


    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })




})



exports.getProductByIdAndDelete = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)


    res.status(200).json({
        status: 'success',
        data: null
    })




})
