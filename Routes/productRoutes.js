const express = require('express');
//creating router


const Route = express.Router();
const factory = require('./../Controllers/factory')
// including controllers file of product
const productRoute = require('./../Controllers/productController');
const protect = require('../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');
const reviewRouter = require('./reviewRoute');
const product = require('../Models/ProductSchma');




Route.use('/:productId/review', reviewRouter);
Route.get('/:id', factory.getOne(product))
Route.get('/getByName/:name', productRoute.getProductByName);
Route.patch('/hideproduct/:name', productRoute.getProductByNameandHide);
Route.patch('/unhideProduct/:name', productRoute.unhideHiddenProduct);



// Route.get('/getHiddenProduct', productRoute.getAllHiddenProduct);


Route.route('/').get(productRoute.getAllProduct).post(protect.protectRoute, giveAccess('ADMIN'), productRoute.uploadImages,
    productRoute.resizeImage, productRoute.createNewProduct)


Route.route('/:id').get(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductById).patch(productRoute.getProductByIdAndUpdate).delete(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductByIdAndDelete)



module.exports = Route;



























