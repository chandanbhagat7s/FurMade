// bringig model for crud operations in db
const Product = require('./../Models/ProductSchma');
// multer oackage for file uploads
const multer = require('multer')

//feature API
const Apifeature = require('../utils/apiFeature');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

// create storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/productImages')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${req.body.productName}_cover.${ext}`)
    }
})
// create filterObject
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('coverImage')) {
        cb(null, true)
    } else {
        cb(new appError('please upload only image files', 400), false)

    }
}

// destination(for saving files) of multer package 
const uploads = multer(
    {
        storage: multerStorage,
        fileFilter: multerFilter
    }
)

// middleware for uploding images
exports.uploadImages = uploads.single('photo')

// for create new product
exports.createNewProduct = catchAsync(async (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
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


// get product by name
exports.getProductByName = catchAsync(async (req, res, next) => {
    console.log(req.params);
    const product = await Product.find({ productName: req.params.name })
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


// get product by name
exports.getProductByNameandHide = catchAsync(async (req, res, next) => {
    console.log(req.params);
    const product = await Product.find({ productName: req.params.name })


    if (!product) {
        // console.log("entred");
        return next(new appError('unable to find id ', 404))
    }
    product[0].hidden = true;

    await product[0].save();


    res.status(200).json({
        status: 'success',

    })




})




exports.unhideHiddenProduct = catchAsync(async (req, res, next) => {
    console.log(req.params);
    let options = {
        disableMiddlewares: true, // can be checked in middleware with this.options.disableMiddlewares
    };
    const product = await Product.find({ productName: req.params.name }).setOptions(options)


    if (!product) {
        // console.log("entred");
        return next(new appError('unable to find product ', 404))
    }
    console.log(product);
    product[0].hidden = false;

    await product[0].save();


    res.status(200).json({
        status: 'success',

    })




})



