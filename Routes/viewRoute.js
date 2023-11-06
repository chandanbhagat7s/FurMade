const express = require('express');

const Router = express.Router()

const viewRoute = require('./../Controllers/viewController');
const { isLogedIn, protectRoute } = require('../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');



// Router.use()

Router.get('/', isLogedIn, viewRoute.Home)
Router.get('/me', protectRoute, viewRoute.me)
Router.get('/login', isLogedIn, viewRoute.Login)
Router.get('/signup', isLogedIn, viewRoute.Signup)
Router.get('/productss/:slug', isLogedIn, viewRoute.getProduct)


Router.get('/addProduct', protectRoute, giveAccess('ADMIN'), viewRoute.addNewProduct)
Router.get('/deleteProduct', protectRoute, giveAccess('ADMIN'), viewRoute.deleteProduct)
Router.get('/hideProduct', protectRoute, giveAccess('ADMIN'), viewRoute.hideProduct)
Router.get('/getAllHiddenProductList', protectRoute, giveAccess('ADMIN'), viewRoute.getAllHiddenProduct)

module.exports = Router;











