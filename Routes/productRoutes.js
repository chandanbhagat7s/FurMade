const express = require('express');
//creating router
const Route = express.Router();
// including controllers file of product
const productRoute = require('./../Controllers/productController');
const protect = require('../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');
const reviewRouter = require('./reviewRoute')


Route.use('/:productId/review', reviewRouter);


Route.route('/').get(productRoute.getAllProduct).post(protect.protectRoute, giveAccess('ADMIN'), productRoute.createNewProduct)


Route.route('/:id').get(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductById).patch(productRoute.getProductByIdAndUpdate).delete(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductByIdAndDelete)



module.exports = Route;



























