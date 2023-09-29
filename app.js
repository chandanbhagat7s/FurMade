


const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const globalErrorHandler = require('./Controllers/errorController');
// for appError
const appError = require('./utils/appError');


//Product Router
const ProductController = require('./Routes/productRoutes');

// Start express app
const app = express();
// to get all everything 
app.use(express.json())
app.use(express.static('./public'))


console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}






// creating objject
// const newProduct = product({
//   productName: "a",
//   price: 2000
// });
// newProduct.save().then(doc => {
//   console.log(doc);
// }).catch((err) => {
//   console.log("data not inserted", err);
// })


app.use('/api/product', ProductController)

app.all('*', (req, res, next) => {
  // next function called with argumnet will triger the error handler direcly okk 
  // next(new Error(`no route found with url ${req.originalUrl}`))
  // now simply we can implement it all the way around but we will create an error class and use it for the oprational error ok 
  next(new appError(`no such route with ${req.originalUrl} !!`, 404))
})

// to handle error : this is error first handler
app.use(globalErrorHandler)


module.exports = app;




















