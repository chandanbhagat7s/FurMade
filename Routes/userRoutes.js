const express = require('express');

// create router of it 
const rout = express.Router()

const protect = require('../Middleware/protect')
// conntroller
const userController = require('./../Controllers/userController')
const factory = require('./../Controllers/factory')

// authcontroller 
const authController = require('./../Controllers/authController');
const giveAccess = require('../Middleware/giveaccess');
const User = require('../Models/UserSchema');



rout.get('/logout', authController.logout)
// rout.get('/:id', factory.getOne(User))
rout.get('/:id', factory.getOne(User))
rout.post('/signup', authController.signUp)
rout.post('/login', authController.login)
rout.post('/forgotPassword', authController.forgotPassword)
// rout.patch('/updateMe', userController.updateMe);
rout.patch('/addToCart', protect.protectRoute, userController.addTocart)
rout.patch('/removeFromCart', protect.protectRoute, userController.removeFromCart)
rout.patch('/resetPassword/:token', authController.resetPassword)

rout.patch('/updateUser/:id', userController.updateUser)


//
rout.use(protect.protectRoute, giveAccess('ADMIN'))
rout.get('getAllUser', userController.getAll);
rout.delete('deleteUser', userController.deleteUser);







module.exports = rout;












