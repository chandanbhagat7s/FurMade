const express = require('express');
//creating router
const Route = express.Router();
// including controllers file of product
const productRoute = require('./../Controllers/productController');
const protect = require('../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');


Route.route('/').get(productRoute.getAllProduct).post(productRoute.createNewProduct)


Route.route('/:id').get(productRoute.getProductById).patch(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductByIdAndUpdate).delete(protect.protectRoute, giveAccess('ADMIN'), productRoute.getProductByIdAndDelete)



module.exports = Route;



























