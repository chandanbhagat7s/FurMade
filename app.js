


const path = require('path')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const globalErrorHandler = require('./Controllers/errorController');
// for appError
const appError = require('./utils/appError');


//Product Router
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const reviewRoute = require('./Routes/reviewRoute');
const viewRoute = require('./Routes/viewRoute');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

// Start express app
const app = express();
// to get all everything 
app.use(express.json())
// app.use(express.static('./public'))


console.log(process.env.NODE_ENV);

app.use(morgan('dev'))
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

app.use(cors({
  origin: "http://localhost:5173", credentials: true,
  'Access-Control-Allow-Origin': '*',
  Vary: 'Origin'
}));
app.use(cookieParser())

// for renderring pages 
app.set('view engine', 'pug')
// remove the bug of paths and slashes in finding the paths 
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))


app.use((req, res, next) => {

  next();
})

// cloudanary configration


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
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
// now we illl render the pages


app.use('/', viewRoute)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/payment', paymentRoutes)

app.all('*', (req, res, next) => {
  // next function called with argumnet will triger the error handler direcly okk 
  // next(new Error(`no route found with url ${req.originalUrl}`))
  // now simply we can implement it all the way around but we will create an error class and use it for the oprational error ok 
  next(new appError(`no such route with ${req.originalUrl} !!`, 404))
})

// to handle error : this is error first handler
app.use(globalErrorHandler)




module.exports = app;




















