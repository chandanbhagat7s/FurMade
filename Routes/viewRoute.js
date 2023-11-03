const express = require('express');

const Router = express.Router()

const viewRoute = require('./../Controllers/viewController');
const { isLogedIn, protectRoute } = require('../Middleware/protect');



// Router.use()

Router.get('/', isLogedIn, viewRoute.Home)
Router.get('/me', protectRoute, viewRoute.me)
Router.get('/login', isLogedIn, viewRoute.Login)
Router.get('/signup', isLogedIn, viewRoute.Signup)
Router.get('/productss/:slug', isLogedIn, viewRoute.getProduct)
// Router.get('/',)

module.exports = Router;











