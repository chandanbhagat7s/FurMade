const express = require('express');
//creating router
const Route = express.Router();
// including controllers file of product
const productRoute = require('./../Controllers/productController')


Route.route('/').get(productRoute.getAllProduct).post(productRoute.createNewProduct)


Route.route('/:id').get(productRoute.getProductById).patch(productRoute.getProductByIdAndUpdate).delete(productRoute.getProductByIdAndDelete)



module.exports = Route;



























