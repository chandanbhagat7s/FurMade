const express = require('express');

const Router = express.Router()

const viewRoute = require('./../Controllers/viewController');
const { isLogedIn } = require('../Middleware/protect');

console.log("runnnnn");

Router.use(isLogedIn)

Router.get('/', viewRoute.Home)
Router.get('/productss/:slug', viewRoute.getProduct)
// Router.get('/',)

module.exports = Router;











