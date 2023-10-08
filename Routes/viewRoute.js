const express = require('express');

const Router = express.Router()

const viewRoute = require('./../Controllers/viewController')


Router.get('/', viewRoute.Home)
Router.get('/productss/:slug', viewRoute.getProduct)
// Router.get('/',)

module.exports = Router;











