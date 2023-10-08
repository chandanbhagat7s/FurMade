
const express = require('express');

const Router = express.Router({ mergeParams: true });
const reviewRoute = require('./../Controllers/reviewController')
const protect = require('./../Middleware/protect');
const giveAccess = require('../Middleware/giveaccess');

const custom = require('./../Middleware/custom')


Router.route('/').get(
    reviewRoute.getAllReview).post(protect.protectRoute, giveAccess('USER'), custom.createReviewMiddleware, reviewRoute.createReview)

module.exports = Router;



















