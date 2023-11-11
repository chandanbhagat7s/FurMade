const express = require('express');

const Router = express.Router()

const viewRoute = require('./../Controllers/viewController');
const { isLogedIn, protectRoute } = require('../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');



// Router.use()

Router.get('/', isLogedIn, viewRoute.Home)
Router.get('/me', protectRoute, viewRoute.me)
Router.get('/login', isLogedIn, viewRoute.Login)
Router.get('/success', isLogedIn, viewRoute.success)
Router.get('/failure', isLogedIn, viewRoute.fail)
Router.get('/editProfile/:id', isLogedIn, viewRoute.editProfile)
Router.get('/signup', isLogedIn, viewRoute.signup)
Router.get('/payNow/:productName', isLogedIn, viewRoute.buyNowCard)
Router.get('/productss/:slug', isLogedIn, viewRoute.getProduct)
Router.get('/allReviews/:productName', viewRoute.getAllReviewOfProduct)


Router.get('/addProduct', protectRoute, giveAccess('ADMIN'), viewRoute.addNewProduct)
Router.get('/deleteProduct', protectRoute, giveAccess('ADMIN'), viewRoute.deleteProduct)
Router.get('/editProduct/:proudttt', protectRoute, giveAccess('ADMIN'), viewRoute.editProduct)
Router.get('/hideProduct', protectRoute, giveAccess('ADMIN'), viewRoute.hideProduct)
Router.get('/getAllHiddenProductList', protectRoute, giveAccess('ADMIN'), viewRoute.getAllHiddenProduct)
Router.get('/', viewRoute.Home)
Router.get('/productss/:slug', viewRoute.getProduct)
// Router.get('/',)

module.exports = Router;











